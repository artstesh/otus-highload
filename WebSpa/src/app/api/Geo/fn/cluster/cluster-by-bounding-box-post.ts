/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { FieldCluster } from '../../models/field-cluster';
import { GetByBoundingBoxRequest } from '../../models/get-by-bounding-box-request';

export interface ClusterByBoundingBoxPost$Params {
      body?: GetByBoundingBoxRequest
}

export function clusterByBoundingBoxPost(http: HttpClient, rootUrl: string, params?: ClusterByBoundingBoxPost$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<FieldCluster>>> {
  const rb = new RequestBuilder(rootUrl, clusterByBoundingBoxPost.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/*+json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<FieldCluster>>;
    })
  );
}

clusterByBoundingBoxPost.PATH = '/Cluster/by-bounding-box';
