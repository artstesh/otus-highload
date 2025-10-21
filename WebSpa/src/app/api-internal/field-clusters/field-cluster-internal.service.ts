import { Injectable } from '@angular/core';
import { AppPostboyService } from '@root/src/app/services/app-postboy.service';
import { IPostboyDependingService } from '@artstesh/postboy';
import { catchError, of, Subscription, takeUntil } from 'rxjs';
import { ListFieldClustersQuery } from '@root/src/app/api-internal/field-clusters/messages/list-field-clusters.query';
import { ClusterService } from '@api/Geo';

@Injectable({
   providedIn: 'root'
})
export class FieldClusterInternalService implements IPostboyDependingService {
   private readonly _namespace = 'field-cluster-internal';

   constructor(
      private postboy: AppPostboyService,
      private remote: ClusterService
   ) {
      this.postboy.addNamespace(this._namespace).recordSubject(ListFieldClustersQuery);
   }

   up(): void {
      this.postboy.sub(ListFieldClustersQuery).subscribe(qry => this.list(qry));
   }

   private list(qry: ListFieldClustersQuery) {

      this.remote
         .clusterByBoundingBoxPost({ body: { extent: qry.extent } })
         .pipe(
            takeUntil(qry.cancel$),
            catchError(err => of([]))
         )
         .subscribe(result => qry.finish(result));
   }

   down(): void {
      this.postboy.eliminateNamespace(this._namespace);
   }
}
