import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ChartModule } from '@artstesh/charts';
import { ArtModalModule } from '@artstesh/modals';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { APP_ROUTES } from '@root/src/app/routes';
import { environment } from '@root/src/environments/environment';
import { AppComponent } from './app.component';
import { FieldsApiModule } from './api/fields';
import { GeoApiModule } from '@api/Geo';

/**
 * This is the root module of the application.
 *
 * The `AppModule` class is decorated with the `@NgModule` decorator that defines metadata for the module, including:
 *
 */
@NgModule({
   declarations: [AppComponent],
   imports: [
      BrowserModule,
      HttpClientModule,
      RouterModule.forRoot(APP_ROUTES),
      FieldsApiModule.forRoot({ rootUrl: environment.fields }),
      GeoApiModule.forRoot({ rootUrl: environment.geo }),
      ArtModalModule
   ],
   providers: [{ provide: LocationStrategy, useClass: PathLocationStrategy }],
   bootstrap: [AppComponent]
})
export class AppModule {
   /**
    * Constructor for initializing the class with required services and registering for specific events.
    *
    * @param {PublicEventsService} eventService - The service responsible for handling public events.
    */
   // constructor(private readonly eventService: PublicEventsService) {
   //    this.eventService
   //       .registerForEvents()
   //       .pipe(filter(notification => notification.type === EventTypes.ConfigLoaded))
   //       .subscribe(config => {
   //          // ignore
   //       });
   // }
}
