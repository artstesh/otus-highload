import { Injectable } from '@angular/core';
import { ListRegionsQuery } from '@root/src/app/api-internal/regions/messages/list-regions.query';
import { IPostboyDependingService } from '@artstesh/postboy';
import { RemoteBalancedHelper } from '@root/src/app/api-internal/helpers/remote-balanced.helper';
import { Region, RegionService } from '@api/Geo';
import { RemoteBalancedHelperFactory } from '@root/src/app/api-internal/helpers/remote-balanced.helper.factory';
import { AppPostboyService } from '@root/src/app/services/app-postboy.service';

@Injectable()
export class RegionsInternalService implements IPostboyDependingService {
   private readonly _namespace = 'regions-internal';
   listBalancer: RemoteBalancedHelper<ListRegionsQuery, Region[], Region[]>;

   constructor(remote: RegionService, factory: RemoteBalancedHelperFactory, private postboy: AppPostboyService) {
      this.postboy.addNamespace(this._namespace).recordSubject(ListRegionsQuery);
      this.listBalancer = factory.produce({
         message: ListRegionsQuery,
         load: () => remote.regionGet(),
         mutation: m => m,
         failure: [],
         cache: true
      });
   }

   /**
    * Moves the list balancer up by invoking the `up` method of the `listBalancer` instance.
    *
    * @return {void} This method does not return a value.
    */
   up(): void {
      this.listBalancer.up();
   }

   down(): void {
      this.postboy.eliminateNamespace(this._namespace);
   }
}
