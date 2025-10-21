import { ChangeDetectionStrategy, Component, input, TemplateRef } from '@angular/core';
import { FlexModule } from '@ngbracket/ngx-layout';
import { NgTemplateOutlet } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
   selector: 'app-gis-field-passport-data-wrapper',
   standalone: true,
   imports: [FlexModule, NgTemplateOutlet, TranslateModule],
   templateUrl: './gis-field-passport-data-wrapper.component.html',
   styleUrl: './gis-field-passport-data-wrapper.component.scss',
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class GisFieldPassportDataWrapperComponent {
   label = input.required<string>();
   contentRef = input.required<TemplateRef<any>>();
}
