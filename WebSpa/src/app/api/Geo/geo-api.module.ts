/* tslint:disable */
/* eslint-disable */
import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GeoApiConfiguration, GeoApiConfigurationParams } from './geo-api-configuration';

import { ClusterService } from './services/cluster.service';
import { FieldService } from './services/field.service';
import { RegionService } from './services/region.service';

/**
 * Module that provides all services and configuration.
 */
@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    ClusterService,
    FieldService,
    RegionService,
    GeoApiConfiguration
  ],
})
export class GeoApiModule {
  static forRoot(params: GeoApiConfigurationParams): ModuleWithProviders<GeoApiModule> {
    return {
      ngModule: GeoApiModule,
      providers: [
        {
          provide: GeoApiConfiguration,
          useValue: params
        }
      ]
    }
  }

  constructor( 
    @Optional() @SkipSelf() parentModule: GeoApiModule,
    @Optional() http: HttpClient
  ) {
    if (parentModule) {
      throw new Error('GeoApiModule is already loaded. Import in your base AppModule only.');
    }
    if (!http) {
      throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
      'See also https://github.com/angular/angular/issues/20575');
    }
  }
}
