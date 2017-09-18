import {Component,ElementRef, OnInit ,Input} from '@angular/core';
let addStyle=(window as any).myObj.addStyle;
@Component({
  selector: 'app-tooltip',
  template: `
        <ng-content></ng-content> 
  `,
  host:{
    'class':'tpContainer hid0'
  }
})
export class TooltipComponent implements OnInit {
  node:any;
  set pure(val){
    if(!val){
      this.node.classList.add('tcTop');
      this.node.classList.add('leftFade');
    }else if(typeof val=='string'){
      this.node.classList.add(val);
    }
  }
  @Input()set pos(val){
    if(!val)return;
    addStyle(this.node,val);
  };
  constructor(
    private _el:ElementRef
  ){
    this.node=_el.nativeElement;
  }
  ngOnInit(){}
  ngAfterViewInit(){}
}
