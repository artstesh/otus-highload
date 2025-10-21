import { ChangeDetectionStrategy, Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { MapPostboyService } from '@artstesh/maps';
import { FlexModule } from '@ngbracket/ngx-layout';
import { TranslateModule } from '@ngx-translate/core';
import { DestructibleComponent } from '../../shared/components/destructible/destructible.component';
import { GisComponent } from './component/gis/gis.component';
import { GisPageMessageRegistratorService } from './services/gis-page-message-registrator.service';
import { FieldsInternalService } from '../../api-internal/fields/fields-internal.service';

/**
 * The TileMapPageComponent is responsible for displaying Tile-map page content.
 */
@Component({
   selector: 'app-gis-page',
   templateUrl: 'gis-page.component.html',
   styleUrl: 'gis-page.component.scss',
   standalone: true,
   encapsulation: ViewEncapsulation.None,
   changeDetection: ChangeDetectionStrategy.OnPush,
   imports: [
      FlexModule,
      GisComponent,
      TranslateModule
   ],
   providers: [
      FieldsInternalService,
      GisPageMessageRegistratorService,
      MapPostboyService,
   ]
})
export class GisPageComponent extends DestructibleComponent implements OnDestroy {
   /**
    * Constructs an instance of the class and initializes the GisPageMessageRegistratorService.
    *
    * @param {GisPageMessageRegistratorService} registrator - The GisPageMessageRegistratorService responsible for managing application messages.
    */
   constructor(private registrator: GisPageMessageRegistratorService) {
      super();
      this.registrator.up();
   }

   /**
    * @description
    * A callback function that is invoked when the components or object is being destroyed.
    * This function typically contains cleanup logic to ensure that resources are properly
    * released and the system remains stable after the components's lifecycle ends.
    *
    * Specifically, it calls the `down` method on `this.registrator` to perform any
    * necessary deregistration or cleanup tasks related to message handling or communication.
    *
    * @type {Function}
    */
   ngOnDestroy(): void {
      this.registrator.down();
   }
}
