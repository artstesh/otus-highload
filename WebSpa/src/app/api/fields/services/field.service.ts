/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { FieldsApiConfiguration } from '../fields-api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { Field } from '../models/field';
import { fieldIdGet } from '../fn/field/field-id-get';
import { FieldIdGet$Params } from '../fn/field/field-id-get';
import { fieldIdGet$Plain } from '../fn/field/field-id-get-plain';
import { FieldIdGet$Plain$Params } from '../fn/field/field-id-get-plain';
import { fieldPost } from '../fn/field/field-post';
import { FieldPost$Params } from '../fn/field/field-post';
import { fieldPost$Plain } from '../fn/field/field-post-plain';
import { FieldPost$Plain$Params } from '../fn/field/field-post-plain';

@Injectable({ providedIn: 'root' })
export class FieldService extends BaseService {
  constructor(config: FieldsApiConfiguration, http: HttpClient) {
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

  /** Path part for operation `fieldIdGet()` */
  static readonly FieldIdGetPath = '/Field/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `fieldIdGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  fieldIdGet$Plain$Response(params: FieldIdGet$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Field>> {
    return fieldIdGet$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `fieldIdGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  fieldIdGet$Plain(params: FieldIdGet$Plain$Params, context?: HttpContext): Observable<Field> {
    return this.fieldIdGet$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<Field>): Field => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `fieldIdGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  fieldIdGet$Response(params: FieldIdGet$Params, context?: HttpContext): Observable<StrictHttpResponse<Field>> {
    return fieldIdGet(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `fieldIdGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  fieldIdGet(params: FieldIdGet$Params, context?: HttpContext): Observable<Field> {
    return this.fieldIdGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<Field>): Field => r.body)
    );
  }

}
