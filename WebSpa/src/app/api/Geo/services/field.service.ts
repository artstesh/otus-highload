/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { GeoApiConfiguration } from '../geo-api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { fieldByBoundingBoxPost } from '../fn/field/field-by-bounding-box-post';
import { FieldByBoundingBoxPost$Params } from '../fn/field/field-by-bounding-box-post';
import { fieldByBoundingBoxPost$Plain } from '../fn/field/field-by-bounding-box-post-plain';
import { FieldByBoundingBoxPost$Plain$Params } from '../fn/field/field-by-bounding-box-post-plain';
import { fieldPost } from '../fn/field/field-post';
import { FieldPost$Params } from '../fn/field/field-post';
import { fieldPost$Plain } from '../fn/field/field-post-plain';
import { FieldPost$Plain$Params } from '../fn/field/field-post-plain';
import { GeoField } from '../models/geo-field';

@Injectable({ providedIn: 'root' })
export class FieldService extends BaseService {
  constructor(config: GeoApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `fieldPost()` */
  static readonly FieldPostPath = '/Field';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `fieldPost$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  fieldPost$Plain$Response(params?: FieldPost$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return fieldPost$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `fieldPost$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  fieldPost$Plain(params?: FieldPost$Plain$Params, context?: HttpContext): Observable<string> {
    return this.fieldPost$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `fieldPost()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  fieldPost$Response(params?: FieldPost$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return fieldPost(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `fieldPost$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  fieldPost(params?: FieldPost$Params, context?: HttpContext): Observable<string> {
    return this.fieldPost$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /** Path part for operation `fieldByBoundingBoxPost()` */
  static readonly FieldByBoundingBoxPostPath = '/Field/by-bounding-box';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `fieldByBoundingBoxPost$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  fieldByBoundingBoxPost$Plain$Response(params?: FieldByBoundingBoxPost$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<GeoField>>> {
    return fieldByBoundingBoxPost$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `fieldByBoundingBoxPost$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  fieldByBoundingBoxPost$Plain(params?: FieldByBoundingBoxPost$Plain$Params, context?: HttpContext): Observable<Array<GeoField>> {
    return this.fieldByBoundingBoxPost$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<GeoField>>): Array<GeoField> => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `fieldByBoundingBoxPost()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  fieldByBoundingBoxPost$Response(params?: FieldByBoundingBoxPost$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<GeoField>>> {
    return fieldByBoundingBoxPost(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `fieldByBoundingBoxPost$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  fieldByBoundingBoxPost(params?: FieldByBoundingBoxPost$Params, context?: HttpContext): Observable<Array<GeoField>> {
    return this.fieldByBoundingBoxPost$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<GeoField>>): Array<GeoField> => r.body)
    );
  }

}
