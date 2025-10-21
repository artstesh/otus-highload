import { PostboyCallbackMessage } from '@artstesh/postboy';
import { Observable } from 'rxjs';

/**
 * Represents an option item for a generic remote service interaction.
 *
 * This class encapsulates a message type for communication, a loader function
 * for retrieving data, and an optional mutation function for processing results.
 *
 * @template T A class type that extends PostboyCallbackMessage with any payload.
 * @template E The type of the result returned by the loader function.
 */
export class RemoteHelperSettings<T extends PostboyCallbackMessage<any>, E> {
   /**
    * Constructor for initializing the class with specified parameters.
    *
    * @param {new (...args: any) => T} message - The message type constructor.
    * @param {(qry: T) => Observable<E>} load - Function to load data based on the query of type T and return an observable of type E.
    * @param {(e: E) => any} [mutation=e => e] - Optional function to process/mutate the data of type E before use.
    * @param {any} [failure=null] - Optional failure callback or handler.
    * @param {boolean} [cache=true] - Optional flag indicating whether caching should be enabled (true) or disabled (false).
    */
   constructor(
      public message: new (...args: any) => T,
      public load: (qry: T) => Observable<E>,
      public mutation: (e: E) => any = e => e,
      public failure: any = null,
      public cache: boolean = true
   ) {}
}
