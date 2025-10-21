import { Component } from '@angular/core';
import { ModalPostboyService } from '@artstesh/modals';
import { AppMessageRegistrator } from '@root/src/app/services/app-message-registrator.service';
import { TitleService } from '@root/src/app/services/title.service';
import { DestructibleComponent } from '@shared/components/destructible/destructible.component';
import { RegionsInternalService } from '@root/src/app/api-internal/regions/regions-internal.service';

/**
 * The AppComponent is the root components of the application.
 *
 * This components is responsible for initializing application-wide services
 * and handles authentication status on initialization.
 *
 * The components extends DestructibleComponent to manage resources during
 * the lifecycle of the components, ensuring a proper cleanup.
 */
@Component({
   selector: 'app-root',
   templateUrl: 'app.component.html',
   providers: [AppMessageRegistrator, ModalPostboyService, TitleService, RegionsInternalService]
})
export class AppComponent extends DestructibleComponent {

   constructor(
      private appMessageRegistrator: AppMessageRegistrator
   ) {
      super();
      appMessageRegistrator.up();
   }

   onDestroy = () => {
      this.appMessageRegistrator.down();
   };
}
