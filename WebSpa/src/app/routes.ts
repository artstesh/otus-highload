import { Routes } from '@angular/router';
import { GisPageComponent } from '@root/src/app/sections/gis-page/gis-page.component';

/**
 * APP_ROUTES is a constant array of route configurations for an Angular application.
 * It defines the routing paths, associated components, and route guards, if any,
 * that should be used when navigating to different parts of the application.
 *
 * This constant is intended to be used with Angular's RouterModule to set up
 * application routing by supplying it to the RouterModule.forRoot or RouterModule.forChild method.
 */
export const APP_ROUTES: Routes = [
   {
      component: GisPageComponent,
      path: ''
   }
];
