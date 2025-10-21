import { PostboyGenericMessage } from '@artstesh/postboy';
import { FieldFeatureInfoModel } from '@root/src/app/sections/gis-page/component/gis/models/field-feature-info.model';

export class ShowFieldPassportCommand extends PostboyGenericMessage {
   static readonly ID = '415f6877-f15f-4e8f-a8eb-bd68056edf63';

   constructor(public field: FieldFeatureInfoModel) {
      super();
   }
}
