/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { GeoApiConfiguration } from '../geo-api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { clusterByBoundingBoxPost } from '../fn/cluster/cluster-by-bounding-box-post';
import { ClusterByBoundingBoxPost$Params } from '../fn/cluster/cluster-by-bounding-box-post';
import { clusterByBoundingBoxPost$Plain } from '../fn/cluster/cluster-by-bounding-box-post-plain';
import { ClusterByBoundingBoxPost$Plain$Params } from '../fn/cluster/cluster-by-bounding-box-post-plain';
import { clusterResetPost } from '../fn/cluster/cluster-reset-post';
import { ClusterResetPost$Params } from '../fn/cluster/cluster-reset-post';
import { FieldCluster } from '../models/field-cluster';

@Injectable({ providedIn: 'root' })
export class ClusterService extends BaseService {
  constructor(config: GeoApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `clusterByBoundingBoxPost()` */
  static readonly ClusterByBoundingBoxPostPath = '/Cluster/by-bounding-box';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `clusterByBoundingBoxPost$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  clusterByBoundingBoxPost$Plain$Response(params?: ClusterByBoundingBoxPost$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<FieldCluster>>> {
    return clusterByBoundingBoxPost$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `clusterByBoundingBoxPost$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  clusterByBoundingBoxPost$Plain(params?: ClusterByBoundingBoxPost$Plain$Params, context?: HttpContext): Observable<Array<FieldCluster>> {
    return this.clusterByBoundingBoxPost$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<FieldCluster>>): Array<FieldCluster> => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `clusterByBoundingBoxPost()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  clusterByBoundingBoxPost$Response(params?: ClusterByBoundingBoxPost$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<FieldCluster>>> {
    return clusterByBoundingBoxPost(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `clusterByBoundingBoxPost$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  clusterByBoundingBoxPost(params?: ClusterByBoundingBoxPost$Params, context?: HttpContext): Observable<Array<FieldCluster>> {
    return this.clusterByBoundingBoxPost$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<FieldCluster>>): Array<FieldCluster> => r.body)
    );
  }

  /** Path part for operation `clusterResetPost()` */
  static readonly ClusterResetPostPath = '/Cluster/reset';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `clusterResetPost()` instead.
   *
   * This method doesn't expect any request body.
   */
  clusterResetPost$Response(params?: ClusterResetPost$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return clusterResetPost(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `clusterResetPost$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  clusterResetPost(params?: ClusterResetPost$Params, context?: HttpContext): Observable<void> {
    return this.clusterResetPost$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
