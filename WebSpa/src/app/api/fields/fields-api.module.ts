/* tslint:disable */
/* eslint-disable */
import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FieldsApiConfiguration, FieldsApiConfigurationParams } from './fields-api-configuration';

import { FieldService } from './services/field.service';

/**
 * Module that provides all services and configuration.
 */
@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    FieldService,
    FieldsApiConfiguration
  ],
})
export class FieldsApiModule {
  static forRoot(params: FieldsApiConfigurationParams): ModuleWithProviders<FieldsApiModule> {
    return {
      ngModule: FieldsApiModule,
      providers: [
        {
          provide: FieldsApiConfiguration,
          useValue: params
        }
      ]
    }
  }

  constructor( 
    @Optional() @SkipSelf() parentModule: FieldsApiModule,
    @Optional() http: HttpClient
  ) {
    if (parentModule) {
      throw new Error('FieldsApiModule is already loaded. Import in your base AppModule only.');
    }
    if (!http) {
      throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
      'See also https://github.com/angular/angular/issues/20575');
    }
  }
}
