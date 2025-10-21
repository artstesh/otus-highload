import { PostboyCallbackMessage } from '@artstesh/postboy';
import { FieldCluster } from '@api/Geo';
import { Subject } from 'rxjs';

export class ListFieldClustersQuery extends PostboyCallbackMessage<FieldCluster[]> {
   static readonly ID = '83bd46de-6178-4bdf-bc77-ba2e07360e87';

   constructor(public extent: number[], public cancel$: Subject<void>) {
      super();
   }
}
