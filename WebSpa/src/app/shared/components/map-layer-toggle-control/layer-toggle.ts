import { EventEmitter } from '@angular/core';
import { MapLyrs, MapPostboyService } from '@artstesh/maps';
import { Control } from 'ol/control';

/**
 * The LayerToggle class is a UI control component that allows users to toggle between
 * different map layers, specifically satellite and terrain layers. It integrates with the
 * MapPostboyService to manage changes in the selected map layer.
 *
 * Extends the Control class to function as a map control.
 */
export class LayerToggle extends Control {
   public changeEmitter = new EventEmitter<MapLyrs>();
   current = MapLyrs.Terrain;

   /**
    * Constructs a new instance of the class.
    * Initializes a toggle switch UI for selecting between satellite and terrain map layers.
    *
    * @param {MapPostboyService} postboy - A service used to handle map-related communication and operations.
    */
   constructor(opt_options?: any) {
      const label = document.createElement('label');
      label.className = 'switch';

      const input = document.createElement('input');
      input.type = 'checkbox';
      input.id = 'togBtn';

      label.appendChild(input);

      const container = document.createElement('div');
      container.className = 'slider round';

      const optSatellite = document.createElement('span');
      optSatellite.className = 'off';
      optSatellite.innerHTML = 'Satellite';

      const optTerrain = document.createElement('span');
      optTerrain.className = 'on';
      optTerrain.innerHTML = 'Terrain';

      container.appendChild(optSatellite);
      container.appendChild(optTerrain);

      label.appendChild(container);

      const element = document.createElement('div');
      element.className = 'map-base-layer-toggle ol-unselectable ol-control';
      element.appendChild(label);

      super({ element: element, target: (opt_options || {}).target });
      this.optionOn = optTerrain;
      this.optionOff = optSatellite;
      input.checked = this.current == MapLyrs.Terrain;
      this.optionOn.classList.add('active');
      optTerrain.addEventListener(
         'click',
         () => {
            this.changeEmitter.next(MapLyrs.Terrain);
            this.optionOff.classList.remove('active');
            this.optionOn.classList.add('active');
            if (input.checked) input.checked = !input.checked;
         },
         false
      );
      optSatellite.addEventListener(
         'click',
         () => {
            this.changeEmitter.next(MapLyrs.Satellite);
            this.optionOn.classList.remove('active');
            this.optionOff.classList.add('active');
            if (!input.checked) input.checked = !input.checked;
         },
         false
      );
   }

   private optionOn: HTMLSpanElement;
   private optionOff: HTMLSpanElement;
}
