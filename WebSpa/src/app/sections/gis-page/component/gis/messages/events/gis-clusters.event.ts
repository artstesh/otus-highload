import { PostboyGenericMessage } from '@artstesh/postboy';
import { FieldCluster } from '@api/Geo';

export class GisClustersEvent extends PostboyGenericMessage {
   static readonly ID = 'd88f836c-9b30-401b-b1cf-b9c450f56144';

   constructor(public items: FieldCluster[]) {
      super();
   }
}
