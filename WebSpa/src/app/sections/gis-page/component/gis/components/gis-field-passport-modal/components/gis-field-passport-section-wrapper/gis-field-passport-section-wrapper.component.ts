import { ChangeDetectionStrategy, Component, input, TemplateRef } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { FlexModule } from '@ngbracket/ngx-layout';
import { TranslateModule } from '@ngx-translate/core';

@Component({
   selector: 'app-gis-field-passport-section-wrapper',
   standalone: true,
   imports: [NgTemplateOutlet, FlexModule, TranslateModule],
   templateUrl: './gis-field-passport-section-wrapper.component.html',
   styleUrl: './gis-field-passport-section-wrapper.component.scss',
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class GisFieldPassportSectionWrapperComponent {
   label = input.required<string>();
   contentRef = input.required<TemplateRef<any>>();
}
