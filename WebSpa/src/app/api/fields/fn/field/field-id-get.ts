/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Field } from '../../models/field';

export interface FieldIdGet$Params {
  id: string;
}

export function fieldIdGet(http: HttpClient, rootUrl: string, params: FieldIdGet$Params, context?: HttpContext): Observable<StrictHttpResponse<Field>> {
  const rb = new RequestBuilder(rootUrl, fieldIdGet.PATH, 'get');
  if (params) {
    rb.path('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Field>;
    })
  );
}

fieldIdGet.PATH = '/Field/{id}';
