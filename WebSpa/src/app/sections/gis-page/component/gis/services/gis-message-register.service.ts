import { Injectable } from '@angular/core';
import { PostboyAbstractRegistrator } from '@artstesh/postboy';
import { AppPostboyService } from '@root/src/app/services/app-postboy.service';
import {
   ShowFieldPassportCommand
} from '@root/src/app/sections/gis-page/component/gis/messages/commands/show-field-passport.command';
import {
   GisFeaturesOrchestratorService
} from '@root/src/app/sections/gis-page/component/gis/services/gis-features-orchestrator.service';
import { GisClustersEvent } from '@root/src/app/sections/gis-page/component/gis/messages/events/gis-clusters.event';
import { GisFieldsEvent } from '@root/src/app/sections/gis-page/component/gis/messages/events/gis-fields.event';

@Injectable()
export class GisMessageRegisterService extends PostboyAbstractRegistrator {

   constructor(postboy: AppPostboyService, feature: GisFeaturesOrchestratorService) {
      super(postboy);
      this.registerServices([feature]);
   }

   protected _up(): void {
      this.recordSubject(ShowFieldPassportCommand);
      this.recordSubject(GisClustersEvent);
      this.recordSubject(GisFieldsEvent);
   }
}
