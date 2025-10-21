import { DragDropModule } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
   FitToPolygonsCommand,
   MapLyrs,
   MapModule,
   MapPostboyService,
   MapSettings,
   ZoomControlSettings
} from '@artstesh/maps';
import { FlexModule } from '@ngbracket/ngx-layout';
import { AppPostboyService } from '@root/src/app/services/app-postboy.service';
import { DestructibleComponent } from '@root/src/app/shared/components/destructible/destructible.component';
import { GisReionPolygonsComponent } from './components/gis-region-polygons/gis-region-polygons.component';
import { LayerToggleControlComponent } from '../../../../shared/components/map-layer-toggle-control/layer-toggle-control.component';
import { ApplyGisExtentCommand } from '../../messages/commands/apply-gis-extent.command';
import { GisMessageRegisterService } from '@root/src/app/sections/gis-page/component/gis/services/gis-message-register.service';
import { GisFieldPassportModalComponent } from '@root/src/app/sections/gis-page/component/gis/components/gis-field-passport-modal/gis-field-passport-modal.component';
import { GisFeaturesOrchestratorService } from '@root/src/app/sections/gis-page/component/gis/services/gis-features-orchestrator.service';
import {
   GisFieldMarkersComponent
} from '@root/src/app/sections/gis-page/component/gis/components/gis-field-markers/gis-field-markers.component';
import {
   GisFieldPolygonsComponent
} from '@root/src/app/sections/gis-page/component/gis/components/gis-field-polygons/gis-field-polygons.component';
import {
   GisClustersComponent
} from '@root/src/app/sections/gis-page/component/gis/components/gis-clusters/gis-clusters.component';

@Component({
   selector: 'app-gis',
   templateUrl: 'gis.component.html',
   styleUrl: 'gis.component.scss',
   standalone: true,
   imports: [
      FlexModule,
      DragDropModule,
      MapModule,
      GisReionPolygonsComponent,
      LayerToggleControlComponent,
      GisFieldPassportModalComponent,
      GisFieldMarkersComponent,
      GisFieldPolygonsComponent,
      GisClustersComponent
   ],
   providers: [GisMessageRegisterService, GisFeaturesOrchestratorService],
   changeDetection: ChangeDetectionStrategy.OnPush,
   encapsulation: ViewEncapsulation.None
})
export class GisComponent extends DestructibleComponent implements OnInit {
   settings = new MapSettings()
      .setCenter([30, -2])
      .setZoom(8)
      .setInteractionSettings({ altShiftDragRotate: false, pinchRotate: false })
      .setLyrs(MapLyrs.Terrain);
   zoomSettings = new ZoomControlSettings().setZoomInLabel('Zoom In');

   /**
    * Constructor of the class.
    */
   constructor(
      private postboy: AppPostboyService,
      private mapPostboy: MapPostboyService,
      private register: GisMessageRegisterService
   ) {
      super();
   }

   /**
    * Initializes the components after Angular first displays the data-bound properties and sets up the components.
    * This method subscribes to the CommonDropdownOpenStateEvent to monitor when the dropdown is open,
    * and if it is, it checks the viewport size of the first scrollable element.
    * @return {void} No return value.
    */
   ngOnInit(): void {
      this.register.up();
      this.observeVisibiliyMarkers();
   }

   private observeVisibiliyMarkers(): void {
      this.postboy.sub(ApplyGisExtentCommand).subscribe(f => {
         this.mapPostboy.fire(new FitToPolygonsCommand(f.polygons));
      });
   }

   onDestroy = () => this.register.down();
}
