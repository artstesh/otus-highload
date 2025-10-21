import { Injectable } from '@angular/core';
import { IPostboyDependingService } from '@artstesh/postboy';
import { AppPostboyService } from '../../services/app-postboy.service';
import { ListFieldsQuery } from './messages/list-fields.query';
import { catchError, of, takeUntil } from 'rxjs';
import { FieldService } from '@api/Geo';

/**
 *
 */
@Injectable()
export class FieldsInternalService implements IPostboyDependingService {
   private readonly _namespace = 'fields-internal';

   constructor(
      private postboy: AppPostboyService,
      private remote: FieldService
   ) {
      this.postboy.addNamespace(this._namespace).recordSubject(ListFieldsQuery);
   }

   up(): void {
      this.postboy.sub(ListFieldsQuery).subscribe(qry => this.fieldList(qry));
   }

   private fieldList(qry: ListFieldsQuery): void {
      this.remote.fieldByBoundingBoxPost({body: {extent: qry.extent, zoom: qry.zoom} })
         .pipe(takeUntil(qry.cancel$),catchError(err => of([]))).subscribe({
         next: result => qry.finish(result),
         error: () => qry.finish([])
      });
   }

   down(): void {
      this.postboy.eliminateNamespace(this._namespace);
   }
}
