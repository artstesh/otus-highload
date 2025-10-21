import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { FeatureLayerSettings, MapModule, PolygonModel, PolygonStyleHelper } from '@artstesh/maps';
import { AppPostboyService } from '@root/src/app/services/app-postboy.service';
import { DestructibleComponent } from '@shared/components/destructible/destructible.component';
import Style from 'ol/style/Style';
import { ListRegionsQuery } from '@root/src/app/api-internal/regions/messages/list-regions.query';

/**
 *
 */
@Component({
   selector: 'app-gis-region-polygons',
   standalone: true,
   imports: [MapModule],
   templateUrl: './gis-region-polygons.component.html',
   styleUrls: [],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class GisReionPolygonsComponent extends DestructibleComponent implements OnInit {
   polygons = signal<PolygonModel[]>([]);
   private polygonStyle: Style = PolygonStyleHelper.simple('transparent', '#a4511c', 2);
   layerSettings = new FeatureLayerSettings().setStyle(this.polygonStyle);

   constructor(private postboy: AppPostboyService) {
      super();
   }

   ngOnInit(): void {
      this.postboy.fireCallback(new ListRegionsQuery()).subscribe(rs => {
         this.polygons.set(rs.map(r => PolygonModel.fromWKT(r.id!, r.wkt!)));
      });
   }
}
