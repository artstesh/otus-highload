import { Component, input, OnInit, output, ViewEncapsulation } from '@angular/core';
import { AddControlCommand, MapPostboyService, MapSettings, RemoveControlCommand } from '@artstesh/maps';
import { DestructibleComponent } from '@shared/components/destructible/destructible.component';
import { LayerToggle } from './layer-toggle';


@Component({
   selector: 'app-map-layer-toggle-control',
   standalone: true,
   template: '',
   styleUrl: 'layer-toggle-control.component.scss',
   encapsulation: ViewEncapsulation.None
})
export class LayerToggleControlComponent extends DestructibleComponent implements OnInit {
   settings = input.required<MapSettings>();
   settingsChange = output<MapSettings>();
   private control?: LayerToggle;

   constructor(private postboy: MapPostboyService) {
      super();
   }


   ngOnInit(): void {
      this.control = new LayerToggle(this.postboy);
      setTimeout(() => this.postboy.fire(new AddControlCommand(this.control!)), 1000); //ToDo Wait for the MapRenderEvent
      this.control.changeEmitter.subscribe(ev => {
         this.settingsChange.emit(this.settings().setLyrs(ev));
      });
   }

   /**
    * A method that executes when the component or control is being destroyed.
    * It checks if the control exists and, if so, dispatches a `RemoveControlCommand`
    * to perform cleanup or removal operations on the control.
    *
    * This function utilizes a conditional check to ensure the existence of the
    * control before attempting to invoke a command to avoid potential errors.
    */
   onDestroy = () => {
      !!this.control && this.postboy.fire(new RemoveControlCommand(this.control));
   };
}
