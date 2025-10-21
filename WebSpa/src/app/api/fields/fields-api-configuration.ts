/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';

/**
 * Global configuration
 */
@Injectable({
  providedIn: 'root',
})
export class FieldsApiConfiguration {
  rootUrl: string = '';
}

/**
 * Parameters for `FieldsApiModule.forRoot()`
 */
export interface FieldsApiConfigurationParams {
  rootUrl?: string;
}
