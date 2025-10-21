import { NgIf, NgTemplateOutlet } from '@angular/common';
import {
   ChangeDetectionStrategy,
   ChangeDetectorRef,
   Component,
   Input,
   TemplateRef,
   ViewEncapsulation
} from '@angular/core';
import { FlexModule } from '@ngbracket/ngx-layout';
import { LoaderComponent } from '@shared/freezed-screen/loader.component';

/**
 * Component representing a loading zone with configurable loading state.
 * This component provides an isolated section in the UI displaying loading indicators
 * based on the provided `isLoading` state.
 *
 * The visual appearance and behavior are influenced by the view encapsulation, change detection strategy,
 * and the imported modules including FlexModule for layout, NgIf for structural directives,
 * and LoaderComponent for the loading indicator.
 *
 * The component leverages Angular's OnPush change detection strategy and ViewEncapsulation.None
 * for efficient rendering and styling management.
 */
@Component({
   selector: 'app-loading-zone',
   standalone: true,
   imports: [FlexModule, NgIf, LoaderComponent, NgTemplateOutlet],
   templateUrl: './loading-zone.component.html',
   styleUrl: './loading-zone.component.scss',
   changeDetection: ChangeDetectionStrategy.OnPush,
   encapsulation: ViewEncapsulation.None
})
export class LoadingZoneComponent {
   @Input() size = 48;
   @Input() contentRef: TemplateRef<any> | null = null;
   /**
    * Setter for the `isLoading` state. Updates the internal `_isLoading` property
    * and triggers change detection to update the view.
    *
    * @param {boolean} v - The new value for the `isLoading` state.
    */
   @Input() set isLoading(v: boolean) {
      this._isLoading = v;
      this.detector.detectChanges();
   }
   _isLoading: boolean = false;

   /**
    * Constructor for the class that initializes with a ChangeDetectorRef instance.
    *
    * @param {ChangeDetectorRef} detector - The Angular ChangeDetectorRef used for detecting and triggering change detection in Angular components.
    */
   constructor(private detector: ChangeDetectorRef) {}
}
