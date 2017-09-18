import {Component,Output,EventEmitter,Input,ContentChild,Directive,ElementRef} from '@angular/core';
import {TotalService} from '../../service/total.service';
const addStyle=(window as any).myObj.addStyle;

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
  styles:[':host{display:block}']
})
export class FixContainerComponent{
  @Input()height:number;
  @Output('down')down:EventEmitter<boolean>=new EventEmitter();
  @Input()set overFix(val){
    if(!val)return;
    let child=this.child,
      self=this.self;
    if(val!='top'){
      addStyle(child,{
        width:'100%',
        left:0,
        position:'fixed',
        top:this.height+'px',
        'z-index':7
      });
      child.classList.add('SlideY');
      this.down.emit(true)
    }else if (val=='top'){
      addStyle(child,{
        position:'relative',
        top:0,
        width:'100%',
        'z-index':1
      });
      child.classList.remove('SlideY');
      setTimeout(()=>{
        if(child.style.position=='relative')child.style.top=0;
      },300);
      this.down.emit(false);
    }
  }
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
