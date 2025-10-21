import { Injectable } from '@angular/core';
import { PostboyAbstractRegistrator } from '@artstesh/postboy';
import { AppPostboyService } from '@root/src/app/services/app-postboy.service';
import { TitleService } from '@root/src/app/services/title.service';
import {
   CompareMapPositionExecutor,
   CompareMapPositionExecutorHandler
} from '@shared/messages/executors/compare-map-position.executor';
import { RegionsInternalService } from '@root/src/app/api-internal/regions/regions-internal.service';

/**
 * AppMessageRegistrator class is responsible for registering message handlers
 * related to theme settings using the PostboyAbstractRegistrator.
 * It registers both replay and subject handlers, particularly for color theme events
 * and theme commands.
 *
 * The constructor initializes the class by calling the parent constructor with the
 * specified AppPostboyService instance and registers a list of services including
 * the ColorThemeService.
 *
 * Methods:
 * - _up(): Registers message handlers for replaying and subject events.
 *
 * Dependencies:
 * - postboy: An instance of AppPostboyService used for postboy operations.
 * - color: An instance of ColorThemeService for handling color theme logic.
 */
@Injectable()
export class AppMessageRegistrator extends PostboyAbstractRegistrator {
   /**
    * Registers handlers for replay and subject events related to color theme changes.
    *
    * @return {void}
    */
   protected _up(): void {
      this.recordHandler(CompareMapPositionExecutor, new CompareMapPositionExecutorHandler());
   }

   constructor(postboy: AppPostboyService, title: TitleService, regions: RegionsInternalService) {
      super(postboy);
      this.registerServices([title, regions]);
   }
}
