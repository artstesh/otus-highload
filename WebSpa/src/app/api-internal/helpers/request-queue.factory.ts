import { Injectable } from '@angular/core';
import { QueryQueue } from '@root/src/app/api-internal/models/query-queue.model';
/**
 * A factory class responsible for creating instances of QueryQueue.
 * Designed to be provided at the root level using Angular's DI system.
 */
@Injectable({ providedIn: 'root' })
export class RequestQueueFactory {
   /**
    * Creates and returns a new instance of QueryQueue.
    *
    * @template T The type of elements contained in the QueryQueue.
    * @return {QueryQueue<T>} A newly created QueryQueue instance.
    */
   public produce<T>(cache: boolean): QueryQueue<T> {
      return new QueryQueue<T>(cache);
   }
}
