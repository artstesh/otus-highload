import { PostboyCallbackMessage } from '@artstesh/postboy';

export class RemoteServiceRequest<T> extends PostboyCallbackMessage<T> {
   /**
    * Creates an instance of the class.    *
    * @param {boolean} [force=false] - A boolean flag to enable or disable forcing functionality.
    */
   constructor(public force: boolean = false) {
      super();
   }

   public hash = () => this.id;
}
