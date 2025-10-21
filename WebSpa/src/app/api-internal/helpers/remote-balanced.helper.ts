import { Dictionary } from '@artstesh/collections';
import { RequestQueueFactory } from '@root/src/app/api-internal/helpers/request-queue.factory';
import { RemoteHelperSettings } from '@root/src/app/api-internal/models/generic-service/generic-remote-service-option-item';
import { QueryQueue } from '@root/src/app/api-internal/models/query-queue.model';
import { RemoteServiceRequest } from '@root/src/app/api-internal/models/remote-service-request';
import { AppPostboyService } from '@root/src/app/services/app-postboy.service';

export class RemoteBalancedHelper<M extends RemoteServiceRequest<T>, T, E> {
   requests = new Dictionary<QueryQueue<T>>();

   /**
    * Constructs a new instance of the class with the provided dependencies.
    *
    * @param {AppPostboyService} postboy - An instance of the AppPostboyService to handle posting operations.
    * @param {RequestQueueFactory} queueFactory - A factory to create request queues.
    * @param {RemoteHelperSettings<M, E>} settings - Configuration settings for the remote helper.
    */
   constructor(
      private postboy: AppPostboyService,
      public queueFactory: RequestQueueFactory,
      public settings: RemoteHelperSettings<M, E>
   ) {}

   /**
    * Subscribes to the specified message from the `postboy` service and executes a query when the message is received.
    *
    * @return {void} No return value.
    */
   up(): void {
      this.postboy.sub(this.settings.message).subscribe(qry => this.execute(qry));
   }

   /**
    * Executes the given query and processes it based on specified conditions.
    *
    * @param {M} qry - The query object containing the necessary data and flags for execution.
    * @return {void} - This method does not return a value.
    */
   execute(qry: M): void {
      const queue = this.getQueue(qry.hash());
      if (qry.force) queue.reset().add(qry);
      else if (queue.tryFinish(qry)) return;
      this.settings.load(qry).subscribe({
         next: m => queue.finish(this.settings.mutation(m)),
         error: e => queue.finish(this.settings.failure)
      });
   }

   /**
    * Retrieves or creates a query queue associated with the given hash.
    *
    * @param {string} hash - The unique identifier used to reference the query queue.
    * @return {QueryQueue<T>} Returns the query queue associated with the provided hash.
    */
   private getQueue(hash: string): QueryQueue<T> {
      if (!this.requests.has(hash)) {
         let value = this.queueFactory.produce<T>(this.settings.cache);
         this.requests.put(hash, value);
         return value;
      }
      return this.requests.take(hash)!;
   }

   /**
    * Resets the internal state of the list queue to its initial configuration.
    *
    * @return {void} Does not return any value.
    */
   reset(hash?: string): void {
      !!hash ? this.requests.take(hash)?.reset() : this.requests.forEach(q => q.reset());
   }
}
