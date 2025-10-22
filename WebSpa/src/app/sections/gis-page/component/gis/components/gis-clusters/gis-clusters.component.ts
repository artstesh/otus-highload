import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import {
   ClusterLayerSettings,
   MapModule,
   MapPostboyService,
   MarkerModel,
   MarkerStyleHelper,
   TextStyleHelper
} from '@artstesh/maps';
import { GisClustersEvent } from '@root/src/app/sections/gis-page/component/gis/messages/events/gis-clusters.event';
import { GisConstants } from '@root/src/app/sections/gis-page/models/gis.constants';
import { AppPostboyService } from '@root/src/app/services/app-postboy.service';
import { DestructibleComponent } from '@shared/components/destructible/destructible.component';

@Component({
   selector: 'app-gis-clusters',
   standalone: true,
   imports: [MapModule],
   templateUrl: './gis-clusters.component.html',
   styleUrls: [],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class GisClustersComponent extends DestructibleComponent implements OnInit {
   clusterLayerSettings = new ClusterLayerSettings()
      .setMaxZoom(12).setStyle(fs => {
      let count = 0;
         fs.forEach(f => count+=(f as unknown as { count: number }).count);
         return MarkerStyleHelper.withText(
            MarkerStyleHelper.circle(11, '#173867', '#fff', 1),
            TextStyleHelper.get(count + '', '600 8px Arial,serif', '#fff')
         );
   });
   markers = signal<MarkerModel[]>([]);

   constructor(private postboy: AppPostboyService) {
      super();
   }

   ngOnInit(): void {
      this.postboy
         .sub(GisClustersEvent)
         .subscribe(ev =>
            this.markers.set(ev.items.map((p, i) => new MarkerModel(p.lat!, p.lon!, i, { count: p.count })))
         );
   }
}
