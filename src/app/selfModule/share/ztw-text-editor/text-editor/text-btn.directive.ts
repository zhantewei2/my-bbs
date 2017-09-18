import { Directive } from '@angular/core';

@Directive({
  selector: '[textEditorBtn]',
  host:{
    class:'btn0 btn-icon'
  }
})
export class TextBtnDirective {
  constructor() {}

}
