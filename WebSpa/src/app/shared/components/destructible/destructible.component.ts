import { Component, OnDestroy, Optional } from '@angular/core';
import { ComponentSatelliteService } from '@shared/services/component-satellite.service';
import { Subscription } from 'rxjs';

/**
 * A components that manages its own destruction lifecycle, ensuring that
 * all subscriptions are properly unsubscribed to avoid memory leaks.
 *
 * This components also allows for an optional cleanup function to be executed
 * when the components is destroyed.
 */
@Component({
   template: '',
   standalone: true
})
export abstract class DestructibleComponent implements OnDestroy {
   protected subs: Subscription[] = [];
   protected onDestroy?: () => void;

   /**
    * Constructs an instance of the class.
    *
    * @param {ComponentSatelliteService} [satellite] - An optional instance of the ComponentSatelliteService used to manage satellite configurations or interactions.
    */
   constructor(@Optional() private satellite?: ComponentSatelliteService) {}

   /**
    * Lifecycle hook that is called when a directive, pipe, or service is destroyed.
    * This method ensures that all subscriptions are properly unsubscribed to prevent memory leaks.
    * It also executes an optional cleanup function if provided.
    *
    * @return {void} No return value.
    */
   ngOnDestroy(): void {
      this.subs.forEach(s => s.unsubscribe());
      this.satellite?.down();
      if (this.onDestroy) this.onDestroy();
   }
}
