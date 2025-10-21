import { Injectable } from '@angular/core';
import { PostboyAbstractRegistrator } from '@artstesh/postboy';
import { FieldClusterInternalService } from '@root/src/app/api-internal/field-clusters/field-cluster-internal.service';
import { ListFieldClustersQuery } from '@root/src/app/api-internal/field-clusters/messages/list-field-clusters.query';
import { FieldsInternalService } from '@root/src/app/api-internal/fields/fields-internal.service';
import { ListFieldsQuery } from '@root/src/app/api-internal/fields/messages/list-fields.query';
import { ZoomTargetFieldsCommand } from '@root/src/app/sections/gis-page/messages/commands/zoom-target-fields.command';
import { AppPostboyService } from '@root/src/app/services/app-postboy.service';
import { ApplyGisExtentCommand } from '../messages/commands/apply-gis-extent.command';

@Injectable()
export class GisPageMessageRegistratorService extends PostboyAbstractRegistrator {
   /**
    * Registers handlers for replay and subject events.
    *
    * @return {void}
    */
   protected _up(): void {
      this.recordSubject(ApplyGisExtentCommand);
      this.recordSubject(ZoomTargetFieldsCommand);
   }

   /**
    * Constructor for initializing the service with dependencies.
    *
    */
   constructor(postboy: AppPostboyService, fields: FieldsInternalService, clusters: FieldClusterInternalService) {
      super(postboy);
      this.registerServices([fields, clusters]);
   }
}
