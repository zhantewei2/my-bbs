import {Component,Output,EventEmitter,Input,ContentChild,Directive,ElementRef} from '@angular/core';
import {TotalService} from '../../service/total.service';


@Directive({
  selector:'[fix-item]'
})
export class FixItemDirective{
  constructor(public el:ElementRef){}
}


@Component ({
  selector:'fix-container',
  template:`
    <ng-content></ng-content>`,
  host:{
    class:'d-block'
  }
})
export class FixContainerComponent{
  @Output('down')down:EventEmitter<boolean>=new EventEmitter();
  child:any;
  self:any;
  @ContentChild(FixItemDirective)content;
  setHeight(){
    this.child=this.content.el.nativeElement;
    this.self=this.el.nativeElement;
    this.self.style.height=this.child.offsetHeight+'px';
  }
  constructor(
    private el:ElementRef,
    private _ts:TotalService
  ){}
  ngAfterContentInit(){
    this.setHeight()
  }
}
