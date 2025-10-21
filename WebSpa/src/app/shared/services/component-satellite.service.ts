import { Subscription } from 'rxjs';

/**
 * An abstract class that provides a base structure for managing and cleaning up subscriptions.
 * Designed to prevent memory leaks by ensuring all subscriptions are unsubscribed when no longer needed.
 */
export abstract class ComponentSatelliteService {
   protected subs: Subscription[] = [];

   /**
    * Unsubscribes from all subscriptions stored in the `subs` array.
    * This method iterates through each subscription and calls the `unsubscribe` method
    * to ensure proper cleanup and prevent memory leaks.
    *
    * @return {void} No return value.
    */
   public down(): void {
      this.subs.forEach(s => s.unsubscribe());
   }
}
