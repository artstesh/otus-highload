/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { GeoApiConfiguration } from '../geo-api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { Region } from '../models/region';
import { regionDefinePost } from '../fn/region/region-define-post';
import { RegionDefinePost$Params } from '../fn/region/region-define-post';
import { regionDefinePost$Plain } from '../fn/region/region-define-post-plain';
import { RegionDefinePost$Plain$Params } from '../fn/region/region-define-post-plain';
import { regionGet } from '../fn/region/region-get';
import { RegionGet$Params } from '../fn/region/region-get';
import { regionGet$Plain } from '../fn/region/region-get-plain';
import { RegionGet$Plain$Params } from '../fn/region/region-get-plain';

@Injectable({ providedIn: 'root' })
export class RegionService extends BaseService {
  constructor(config: GeoApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `regionGet()` */
  static readonly RegionGetPath = '/Region';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `regionGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  regionGet$Plain$Response(params?: RegionGet$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Region>>> {
    return regionGet$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `regionGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  regionGet$Plain(params?: RegionGet$Plain$Params, context?: HttpContext): Observable<Array<Region>> {
    return this.regionGet$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Region>>): Array<Region> => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `regionGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  regionGet$Response(params?: RegionGet$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Region>>> {
    return regionGet(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `regionGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  regionGet(params?: RegionGet$Params, context?: HttpContext): Observable<Array<Region>> {
    return this.regionGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Region>>): Array<Region> => r.body)
    );
  }

  /** Path part for operation `regionDefinePost()` */
  static readonly RegionDefinePostPath = '/Region/define';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `regionDefinePost$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  regionDefinePost$Plain$Response(params?: RegionDefinePost$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return regionDefinePost$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `regionDefinePost$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  regionDefinePost$Plain(params?: RegionDefinePost$Plain$Params, context?: HttpContext): Observable<string> {
    return this.regionDefinePost$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `regionDefinePost()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  regionDefinePost$Response(params?: RegionDefinePost$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return regionDefinePost(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `regionDefinePost$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  regionDefinePost(params?: RegionDefinePost$Params, context?: HttpContext): Observable<string> {
    return this.regionDefinePost$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

}
