import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { ClusterLayerSettings, MapModule, MarkerModel, MarkerStyleHelper, TextStyleHelper } from '@artstesh/maps';
import { GisFieldsEvent } from '@root/src/app/sections/gis-page/component/gis/messages/events/gis-fields.event';
import { GisConstants } from '@root/src/app/sections/gis-page/models/gis.constants';
import { AppPostboyService } from '@root/src/app/services/app-postboy.service';
import { DestructibleComponent } from '@shared/components/destructible/destructible.component';

/**
 *
 */
@Component({
   selector: 'app-gis-field-markers',
   standalone: true,
   imports: [MapModule],
   templateUrl: './gis-field-markers.component.html',
   styleUrls: [],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class GisFieldMarkersComponent extends DestructibleComponent implements OnInit {
   clusterLayerSettings = new ClusterLayerSettings()
      .setMaxZoom(15)
      .setMinZoom(12).setDistance(100)
      .setStyle(f => MarkerStyleHelper.withText(
         MarkerStyleHelper.circle(11,'#963cff', '#fff', 2),
         TextStyleHelper.get(f.length === 1 ? '' : f.length+'', '600 8px Arial,serif', '#fff')
      ));
   markers = signal<MarkerModel[]>([]);

   constructor(
      private postboy: AppPostboyService
   ) {
      super();
   }

   ngOnInit(): void {
      this.postboy
         .sub(GisFieldsEvent)
         .subscribe(ev =>
            this.markers.set(ev.items.filter(i => !i.wkt).map(p => new MarkerModel(p.lat!, p.lon!, p.id!)))
         );
   }
}
