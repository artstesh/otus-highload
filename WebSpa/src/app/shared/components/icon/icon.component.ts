import { Component, Input, OnInit } from '@angular/core';
import { FlexModule } from '@ngbracket/ngx-layout';

/**
 * IconComponent is a standalone Angular components designed to render various types of icons.
 *
 * The components allows customization of the icon type and dimensions through @Input properties.
 * It handles different predefined icon types and can also accept custom icon names as a string.
 *
 * @components
 * @selector 'app-icon'
 * @imports [FlexModule]
 * @templateUrl './icon.components.html'
 * @styleUrl './icon.components.scss'
 */
@Component({
   selector: 'app-icon',
   standalone: true,
   imports: [FlexModule],
   templateUrl: './icon.component.html',
   styleUrl: './icon.component.scss'
})
export class IconComponent implements OnInit {
   /**
    * A variable representing the name of an icon.
    * The icon can be one of the predefined values or any custom string.
    */
   @Input() icon:
     'accounts'
      | string = '';

   /**
    * Represents the width of an element.
    *
    * This variable holds a numeric value representing the width
    * and can be used to set or manipulate the width of a given
    * element within the application.
    *
    * @type {number}
    */
   @Input() width: number = 24;
   /**
    * Represents the height of an element or object.
    *
    * The height is measured in a unit appropriate to the context where it is used, such as pixels, centimeters, etc.
    * It is initialized to 0 by default.
    *
    * @type {number}
    */
   @Input() height: number = 0;

   @Input() fixedSize: boolean = true;
   public unit: 'px' | 'rem' = 'px';

   /**
    * Constructor for creating an instance of the class.
    * Initializes the properties of the class.
    *
    * @return {Object} An instance of the class.
    */
   constructor() {}

   /**
    * Initializes the height property. If the height is not already set,
    * it assigns the value of the width property to the height.
    *
    * @return {void}
    */
   ngOnInit(): void {
      this.height = !this.height ? this.width : this.height;
      this.unit = this.fixedSize ? 'px' : 'rem';
   }
}
