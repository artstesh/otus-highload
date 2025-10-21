import { Component, Input } from '@angular/core';
import { DestructibleComponent } from '@shared/components/destructible/destructible.component';
import { CircleLoaderComponent } from './circle-loader/circle-loader.component';

/**
 * Component representing a frozen screen state.
 */
@Component({
   selector: 'app-loader',
   templateUrl: './loader.component.html',
   styleUrls: ['./loader.component.scss'],
   standalone: true,
   imports: [CircleLoaderComponent]
})
export class LoaderComponent extends DestructibleComponent {
   @Input() size = 48;
}
