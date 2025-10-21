import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { IPostboyDependingService } from '@artstesh/postboy';
import { AppPostboyService } from '@root/src/app/services/app-postboy.service';

/**
 * Service responsible for managing and setting the application title dynamically.
 * Implements IPostboyDependingService interface.
 */
@Injectable()
export class TitleService implements IPostboyDependingService {
   private readonly defaultTitle = 'Otus Highload';
   private title = this.defaultTitle;

   constructor(
      private postboy: AppPostboyService,
      private titleService: Title
   ) {}

   /**
    * Subscribes to necessary observables and events to update the application title dynamically.
    * @return {void} Does not return a value.
    */
   up(): void {
      this.titleService.setTitle(this.title);
   }
}
