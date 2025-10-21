import { Injectable } from '@angular/core';
import { PostboyService } from '@artstesh/postboy';

/**
 * AppPostboyService provides enhanced functionality by extending the PostboyService.
 * This service is injectable and is provided at the root level, ensuring the single
 * instance is available throughout the application.
 */
@Injectable({
   providedIn: 'root'
})
export class AppPostboyService extends PostboyService {
   constructor() {
      super();
   }
}
