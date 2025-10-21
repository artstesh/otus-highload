/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { GeoField } from '../../models/geo-field';
import { GetByBoundingBoxRequest } from '../../models/get-by-bounding-box-request';

export interface FieldByBoundingBoxPost$Params {
      body?: GetByBoundingBoxRequest
}

export function fieldByBoundingBoxPost(http: HttpClient, rootUrl: string, params?: FieldByBoundingBoxPost$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<GeoField>>> {
  const rb = new RequestBuilder(rootUrl, fieldByBoundingBoxPost.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/*+json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<GeoField>>;
    })
  );
}

fieldByBoundingBoxPost.PATH = '/Field/by-bounding-box';
