import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { FeatureLayerSettings, MapModule, PolygonModel, PolygonStyleHelper } from '@artstesh/maps';
import { GisFieldsEvent } from '@root/src/app/sections/gis-page/component/gis/messages/events/gis-fields.event';
import { AppPostboyService } from '@root/src/app/services/app-postboy.service';
import { DestructibleComponent } from '@shared/components/destructible/destructible.component';
import Style from 'ol/style/Style';
import { GisConstants } from '../../../../models/gis.constants';

/**
 *
 */
@Component({
   selector: 'app-gis-field-polygons',
   standalone: true,
   imports: [MapModule],
   templateUrl: './gis-field-polygons.component.html',
   styleUrls: [],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class GisFieldPolygonsComponent extends DestructibleComponent implements OnInit {
   private style: Style = PolygonStyleHelper.simple('#1CA49464', '#1ca494', 2);
   polygons = signal<PolygonModel[]>([]);

   layerSettings = new FeatureLayerSettings()
      .setMinZoom(GisConstants.CnhFieldPolygonEdgeZoom)
      .setName(GisConstants.GisFieldPolygonsLayerName)
      .setStyle(this.style);

   constructor(private postboy: AppPostboyService) {
      super();
   }
   ngOnInit(): void {
      this.postboy
         .sub(GisFieldsEvent)
         .subscribe(ev =>
            this.polygons.set(ev.items.filter(i => !!i.wkt).map(p => PolygonModel.fromWKT(p.id!, p.wkt!)))
         );
   }
}
