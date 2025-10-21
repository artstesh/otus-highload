import { Injectable } from '@angular/core';
import { RemoteBalancedHelper } from '@root/src/app/api-internal/helpers/remote-balanced.helper';
import { RequestQueueFactory } from '@root/src/app/api-internal/helpers/request-queue.factory';
import { RemoteHelperSettings } from '@root/src/app/api-internal/models/generic-service/generic-remote-service-option-item';
import { RemoteServiceRequest } from '@root/src/app/api-internal/models/remote-service-request';
import { AppPostboyService } from '@root/src/app/services/app-postboy.service';

/**
 * A factory service for creating instances of `RemoteBalancedHelper`, which facilitates
 * managing remote service requests with balanced and efficient handling.
 *
 * This factory is designed to work with `AppPostboyService` for post operations
 * and leverages `RequestQueueFactory` for managing request queues.
 */
@Injectable({ providedIn: 'root' })
export class RemoteBalancedHelperFactory {
   /**
    * Creates an instance of the class.
    *
    * @param {AppPostboyService} postboy - The service responsible for handling post operations.
    * @param {RequestQueueFactory} queueFactory - The factory responsible for creating request queues.
    */
   constructor(
      private postboy: AppPostboyService,
      private queueFactory: RequestQueueFactory
   ) {}

   /**
    * Produces an instance of RemoteBalancedHelper with the provided settings.
    *
    * @param {RemoteHelperSettings<M, E>} settings - The configuration settings used to initialize the RemoteBalancedHelper instance.
    * @return {RemoteBalancedHelper<M, T, E>} An instance of RemoteBalancedHelper configured with the provided settings.
    */
   public produce<M extends RemoteServiceRequest<T>, T, E>(
      settings: RemoteHelperSettings<M, E>
   ): RemoteBalancedHelper<M, T, E> {
      return new RemoteBalancedHelper(this.postboy, this.queueFactory, settings);
   }
}
