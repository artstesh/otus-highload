import { PostboyCallbackMessage } from '@artstesh/postboy';
import { Subject } from 'rxjs';
import { GeoField } from '@api/Geo';

/**
 *
 */
export class ListFieldsQuery extends PostboyCallbackMessage<GeoField[]> {
   public static readonly ID = '636092e4-7e0c-44db-897d-c4cbbacccab7';

   /**
    *
    */
   constructor(
      public extent: number[],
      public zoom: number,
      public cancel$: Subject<void>
   ) {
      super();
   }
}
