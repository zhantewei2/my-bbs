import { NgModule } from '@angular/core';
import { SideNavComponent} from './side-nav/side-nav.component';
import {FormsModule ,ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

import {FixContainerComponent,FixItemDirective} from '../component/fix-container.component';
import { UserCardComponent } from './user-card/user-card.component';
import {ScrollVfComponent} from './scroll-vf/scroll-vf.component';
import { SideVfPackageComponent } from './side-vf-package/side-vf-package.component';

import { ZtwModalComponent } from './ztw-modal/ztw-modal.component';
import { OutClickDirective } from './directive/out-click.directive';
import { PreventPressSpaceDirective } from './directive/prevent-press-space.directive';
import { ZtwTextEditorModule} from './ztw-text-editor/ztw-text-editor.module';
import { FooterAlertComponent } from './footer-alert/footer-alert.component';
import { StarLevelComponent } from './star-level/star-level.component';
import { ClickCopyDirective } from './directive/click-copy.directive';
import {ZTWScrollModule} from './scrollModule/ztw-scroll.module';
import { MinModalComponent } from './min-modal/min-modal.component';
import { RowsValidatorDirective,LimitLenDirective } from './directive/rows-validator.directive';
import { ViewContainerDirective } from './directive/view-container.directive';
import { TimePipe } from './pipe/time.pipe';
import { ZtwPaginationComponent } from './ztw-pagination/ztw-pagination.component';
import {TooltipComponent} from './tooltip/tooltip/tooltip.component';
import {TooltipDirective} from './tooltip/tooltip.directive';
import {MinPaginationComponent} from './min-pagination/min-pagination.component';
import {ArticleCardComponent} from './component/article-card/article-card.component';
import {ToolService} from './tool/tool.service';
import { LimitPipe } from './pipe/limit.pipe';
import { ztwDropdown,dropDownMenu } from './dropdown/dropdown.component';
import { ZtwAlertComponent } from './ztw-alert/ztw-alert.component';
import { ZtwProgressBarComponent } from './ztw-progress-bar/ztw-progress-bar.component';
import { ZtwForInDirective } from './directive/ztw-for-in.directive';
import { TrustHtmlPipe } from './pipe/trust-html.pipe';

@NgModule({
  imports: [
      FormsModule,
      CommonModule,
      ReactiveFormsModule,
      ZtwTextEditorModule
  ],
  entryComponents:[
    TooltipComponent
  ],
  declarations: [
    SideNavComponent,
    FixContainerComponent,
    FixItemDirective,

    UserCardComponent,
    ArticleCardComponent,
    TooltipComponent,
    TooltipDirective,
    ScrollVfComponent,
    SideVfPackageComponent,

    ZtwModalComponent,
    OutClickDirective,
    PreventPressSpaceDirective,
    FooterAlertComponent,
    StarLevelComponent,
    ClickCopyDirective,
    MinModalComponent,
    RowsValidatorDirective,
    ViewContainerDirective,
    TimePipe,
    ZtwPaginationComponent,
    MinPaginationComponent,
    LimitLenDirective,
    LimitPipe,
    ztwDropdown,
    dropDownMenu,
    ZtwAlertComponent,
    ZtwProgressBarComponent,
    ZtwForInDirective,
    TrustHtmlPipe
  ],
  exports:[
      SideNavComponent,
    FixContainerComponent,
      FixItemDirective,
      FormsModule,
      CommonModule,
    ztwDropdown,
    dropDownMenu,
    ReactiveFormsModule,
    UserCardComponent,
    ScrollVfComponent,
    SideVfPackageComponent,
    ZtwForInDirective,
    ZtwModalComponent,
    OutClickDirective,
    TooltipComponent,
    TooltipDirective,
    PreventPressSpaceDirective,
    ZtwTextEditorModule,
    FooterAlertComponent,
    StarLevelComponent,
    ClickCopyDirective,
    ZTWScrollModule,
    MinModalComponent,
    RowsValidatorDirective,
    ViewContainerDirective,
    TimePipe,
    LimitPipe,
    ZtwPaginationComponent,
    MinPaginationComponent,
    LimitLenDirective,
    ArticleCardComponent,
    ZtwAlertComponent,
    ZtwProgressBarComponent,
    TrustHtmlPipe
  ],
  providers:[
    ToolService
  ]
})
export class ShareModule { }
