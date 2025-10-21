import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import {
   GisFieldPassportDataWrapperComponent
} from '@root/src/app/sections/gis-page/component/gis/components/gis-field-passport-modal/components/gis-field-passport-data-wrapper/gis-field-passport-data-wrapper.component';
import { FieldFeatureInfoModel } from '@root/src/app/sections/gis-page/component/gis/models/field-feature-info.model';
import { DecimalPipe } from '@angular/common';
import { FlexModule } from '@ngbracket/ngx-layout';
import { TranslateModule } from '@ngx-translate/core';

@Component({
   selector: 'app-gis-field-passport-field-info',
   standalone: true,
   imports: [GisFieldPassportDataWrapperComponent, DecimalPipe, FlexModule, TranslateModule],
   templateUrl: './gis-field-passport-field-info.component.html',
   styleUrl: './gis-field-passport-field-info.component.scss',
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class GisFieldPassportFieldInfoComponent {
   field = input.required<FieldFeatureInfoModel>();
}
