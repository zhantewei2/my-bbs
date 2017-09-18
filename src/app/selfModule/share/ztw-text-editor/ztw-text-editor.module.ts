import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';
import { TextEditorComponent } from './text-editor/text-editor.component';
import { ModalComponent } from './modal/modal.component';
import { LoadingComponent } from '../loading/loading.component';
import { FontColorComponent } from './button/font-color/font-color.component';
import { FontSizeComponent} from './button/font-size/font-size.component';
import { HrefComponent } from './button/href/href.component';
import { ImageComponent } from './button/image/image.component';
import { TextBtnDirective } from './text-editor/text-btn.directive';
import {ztwTabBtn,ztwTabContent,ZtwTabComponent} from '../ztw-tab/ztw-tab.component';
import { InnerTemplateDirective } from '../directive/inner-template.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [TextEditorComponent, ModalComponent, FontColorComponent, FontSizeComponent, HrefComponent, ImageComponent, TextBtnDirective,
    ztwTabBtn,ztwTabContent,ZtwTabComponent,InnerTemplateDirective,LoadingComponent
  ],
  exports:[TextEditorComponent,TextBtnDirective,ztwTabContent,LoadingComponent,ZtwTabComponent,ztwTabBtn,InnerTemplateDirective]
})
export class ZtwTextEditorModule { }
