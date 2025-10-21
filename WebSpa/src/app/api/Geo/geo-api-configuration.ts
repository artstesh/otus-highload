/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';

/**
 * Global configuration
 */
@Injectable({
  providedIn: 'root',
})
export class GeoApiConfiguration {
  rootUrl: string = '';
}

/**
 * Parameters for `GeoApiModule.forRoot()`
 */
export interface GeoApiConfigurationParams {
  rootUrl?: string;
}
