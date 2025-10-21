import { Injectable } from '@angular/core';
import { IPostboyDependingService } from '@artstesh/postboy';
import { AppPostboyService } from '@root/src/app/services/app-postboy.service';
import { GetMapPositionExecutor, MapMoveEndEvent, MapPosition, MapPostboyService } from '@artstesh/maps';
import { CompareMapPositionExecutor } from '@shared/messages/executors/compare-map-position.executor';
import { debounceTime, filter, map, startWith } from 'rxjs/operators';
import { Subject, switchMap, tap } from 'rxjs';
import { GisConstants } from '@root/src/app/sections/gis-page/models/gis.constants';
import { GisClustersEvent } from '@root/src/app/sections/gis-page/component/gis/messages/events/gis-clusters.event';
import { ListFieldClustersQuery } from '@root/src/app/api-internal/field-clusters/messages/list-field-clusters.query';
import { ListFieldsQuery } from '@root/src/app/api-internal/fields/messages/list-fields.query';
import { GisFieldsEvent } from '@root/src/app/sections/gis-page/component/gis/messages/events/gis-fields.event';
import { FieldCluster, GeoField } from '@api/Geo';

@Injectable()
export class GisFeaturesOrchestratorService implements IPostboyDependingService {
   private previousPosition?: MapPosition;

   constructor( public postboy: AppPostboyService,
                private mapPostboy: MapPostboyService) {

   }
   up(): void {
      let cancel$: Subject<void>;
      this.mapPostboy
         .sub(MapMoveEndEvent)
         .pipe(
            map(ev => ev.position!),
            startWith(this.mapPostboy.exec(new GetMapPositionExecutor())),
            filter(ev => !!ev && this.mapPositionFilter(ev)),
            tap(() => {
               cancel$?.next();
               cancel$ = new Subject();
            })
         )
         .subscribe(position => {
            if (position!.zoom < 12) {
               this.postboy.fireCallback(new ListFieldClustersQuery(position!.extent,cancel$))
                  .subscribe(rs => this.update(rs, []));
            } else {
               this.postboy.fireCallback(new ListFieldsQuery(position!.extent!, position!.zoom!, cancel$))
                  .subscribe(fs => this.update([], fs))
            }
         });
   }

   private update(clusters: FieldCluster[], fields: GeoField[]): void {
      this.postboy.fire(new GisClustersEvent(clusters));
      this.postboy.fire(new GisFieldsEvent(fields));
   }

   private mapPositionFilter(position: MapPosition): boolean {
      let result = this.postboy.exec<boolean>(new CompareMapPositionExecutor(position, this.previousPosition))
      this.previousPosition = position;
      return result;
   }
   down?: (() => void) | undefined;
}
