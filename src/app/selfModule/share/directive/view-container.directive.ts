import { Directive,ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[viewContainer]',
  exportAs:'vcr'
})
export class ViewContainerDirective {
  constructor(public vcr:ViewContainerRef) { }
}
