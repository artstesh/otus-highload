import { PostboyGenericMessage } from '@artstesh/postboy';
import { FieldCluster } from '@api/Geo';
import { GeoField } from '@api/Geo';

export class GisFieldsEvent extends PostboyGenericMessage {
   static readonly ID = 'e9a4fd44-72e9-497f-b21e-8d56255b9e35';

   constructor(public items: GeoField[]) {
      super();
   }
}
