import { Component, Input } from '@angular/core';

/**
 * CircleLoaderComponent is a reusable Angular components that displays a circular loading indicator.
 *
 * This components is typically used to indicate loading or processing state in an application,
 * providing a visual cue to users that some background activity is taking place.
 *
 * The components is standalone and can be used in various parts of the application
 * without requiring additional configuration.
 *
 * Attributes:
 * - direction: Determines the direction of the loader's animation.
 *              Accepted values are 'clockwise' and 'counterclockwise'.
 *              Defaults to 'clockwise'.
 */
@Component({
   selector: 'app-circle-loader',
   templateUrl: './circle-loader.component.html',
   styleUrls: ['./circle-loader.component.scss'],
   standalone: true
})
export class CircleLoaderComponent {
   /**
    * Represents the direction of rotation.
    * It can either be 'clockwise' or 'counterclockwise'.
    *
    * @type {'clockwise' | 'counterclockwise'}
    * @default 'clockwise'
    */
   @Input() public direction: 'clockwise' | 'counterclockwise' = 'clockwise';
}
