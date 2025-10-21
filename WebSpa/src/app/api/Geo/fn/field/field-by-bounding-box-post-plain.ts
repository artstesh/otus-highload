/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { GeoField } from '../../models/geo-field';
import { GetByBoundingBoxRequest } from '../../models/get-by-bounding-box-request';

export interface FieldByBoundingBoxPost$Plain$Params {
      body?: GetByBoundingBoxRequest
}

export function fieldByBoundingBoxPost$Plain(http: HttpClient, rootUrl: string, params?: FieldByBoundingBoxPost$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<GeoField>>> {
  const rb = new RequestBuilder(rootUrl, fieldByBoundingBoxPost$Plain.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/*+json');
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<GeoField>>;
    })
  );
}

fieldByBoundingBoxPost$Plain.PATH = '/Field/by-bounding-box';
