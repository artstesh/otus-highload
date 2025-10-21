import { RemoteServiceRequest } from '@root/src/app/api-internal/models/remote-service-request';
import { Region } from '@api/Geo';

export class ListRegionsQuery extends RemoteServiceRequest<Region[]> {
   static readonly ID = 'f301daf2-1ea7-4a20-9ddf-e2c7f73a8616';

   constructor() {
      super();
   }
}
