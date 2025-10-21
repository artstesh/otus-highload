import { ChangeDetectionStrategy, Component, OnInit, signal, ViewEncapsulation } from '@angular/core';
import {
   ArtModalModule,
   CloseModalCommand,
   ModalPostboyService,
   ModalSettings,
   OpenModalCommand
} from '@artstesh/modals';
import { FlexModule } from '@ngbracket/ngx-layout';
import { TranslateModule } from '@ngx-translate/core';
import { GisFieldPassportFieldInfoComponent } from '@root/src/app/sections/gis-page/component/gis/components/gis-field-passport-modal/components/gis-field-passport-field-info/gis-field-passport-field-info.component';
import { GisFieldPassportSectionWrapperComponent } from '@root/src/app/sections/gis-page/component/gis/components/gis-field-passport-modal/components/gis-field-passport-section-wrapper/gis-field-passport-section-wrapper.component';
import { ShowFieldPassportCommand } from '@root/src/app/sections/gis-page/component/gis/messages/commands/show-field-passport.command';
import { AppPostboyService } from '@root/src/app/services/app-postboy.service';
import { DestructibleComponent } from '@shared/components/destructible/destructible.component';
import { switchMap, tap } from 'rxjs';
import { LoadingZoneComponent } from '@shared/components/loading-zone/loading-zone.component';
import { FieldFeatureInfoModel } from '@root/src/app/sections/gis-page/component/gis/models/field-feature-info.model';

@Component({
   selector: 'app-gis-field-passport-modal',
   standalone: true,
   imports: [
      ArtModalModule,
      GisFieldPassportSectionWrapperComponent,
      TranslateModule,
      FlexModule,
      GisFieldPassportFieldInfoComponent,
      LoadingZoneComponent
   ],
   templateUrl: './gis-field-passport-modal.component.html',
   styleUrl: './gis-field-passport-modal.component.scss',
   changeDetection: ChangeDetectionStrategy.OnPush,
   encapsulation: ViewEncapsulation.None
})
export class GisFieldPassportModalComponent extends DestructibleComponent implements OnInit {
   settings: ModalSettings = new ModalSettings();
   readonly field = signal<FieldFeatureInfoModel | null>(null);

   constructor(
      private postboy: AppPostboyService,
      private modalPostboy: ModalPostboyService
   ) {
      super();
   }

   ngOnInit(): void {
      this.postboy
         .sub(ShowFieldPassportCommand)
         .pipe(
            tap(c => this.field.set(c.field)),
            switchMap(c => this.modalPostboy.fireCallback(new OpenModalCommand(this.settings.id)))
         )
         .subscribe();
   }

   close(): void {
      this.modalPostboy.fire(new CloseModalCommand(this.settings.id));
   }
}
