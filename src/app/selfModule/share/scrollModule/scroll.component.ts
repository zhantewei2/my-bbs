import {Component,Input,ContentChildren,forwardRef,Output,EventEmitter} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/debounceTime';
import {ScrollBindDirective} from './scrollBind.directive';
import {ztwScrollParent} from './scroll.service';
interface OffsetControl{
  top:number;
  bottom:number;
  value:any;
  over?:any;
}
@Component({
	selector:'ztwScroll',
  template:` <ng-content></ng-content>` ,
  providers:[
  { provide:NG_VALUE_ACCESSOR,
    useExisting:forwardRef(()=>ScrollComponent),
    multi:true
  },
    {
      provide:ztwScrollParent,
      useExisting:forwardRef(()=>ScrollComponent)
    }
  ]
})
export class ScrollComponent{
  @ContentChildren(ScrollBindDirective)controls;
  @Input()baseLine=0;
  @Input()throttleTime:number=0;
  @Output('event')event:EventEmitter<any>=new EventEmitter();
  @Input()justScroll:boolean;
  scrollOb:Observable<any>=Observable.fromEvent(window,'scroll');
  resizeOb:Observable<any>=Observable.fromEvent(window,'resize');
  offsetControls:Array<OffsetControl>=[];
  scrollSub:any;
  resizeSub:any;
  storeMsn:any;
  scrollHeight:number;
  scrollTop:number;
  bodySize:any;
  scrollBottom:number;
  bound:number;
  stop:boolean=false;
  emit:any=()=>{};
  eventTimeout:any;
  timeoutFn=()=>{
    this.eventTimeout=setTimeout(()=>{this.eventTimeout=null;this.event.emit(this.getScrollPos())},100);
  };
  emitEvent:any=(val)=>{
    if(this.eventTimeout){
      clearTimeout(this.eventTimeout);
      this.timeoutFn();
    }else{
      this.timeoutFn();
    }
    this.event.emit(val);
  };
  changeEmit:any=(msn)=>{
   if(this.storeMsn!==msn){
     this.emit(msn);
     this.storeMsn=msn;
   }
 };
  constructor(){}
  subScroll(){
    if(this.scrollSub||this.resizeSub)return;
    this.scrollSub=this.scrollOb.throttleTime(this.throttleTime).subscribe(()=>{
      this.checkOnce();
    });
    this.resizeSub=this.resizeOb.debounceTime(300).subscribe(()=>{
      this.calControls();
    })
  }
 ngAfterViewInit(){
    if(this.justScroll)return;
   this.calControls();
   this.controls.changes.subscribe(v=>this.calControls());
   this.subScroll();
   /*
   this.scrollOb.throttleTime(1000).subscribe(v=>{
     if(this.stop)return;
     this.scrollHeight=document.querySelector('body').scrollHeight;
     if(this.scrollHeight==this.bodySize)return;
     this.bodySize =this.scrollHeight;
     this.calControls();
   });
   */
 };
  getScrollPos(){
    let top=this.scrollTop=this.getScrollTop();
    return {top:top,bottom:top+window.innerHeight};
  }
  checkOnce(emit=true){
    let pos=this.getScrollPos();
    this.emitEvent(pos);
    if(!emit)return;
    let i=this.offsetControls.length,control;
    while(i--) {
      control=this.offsetControls[i];
      this.bound=control.over === 'bottom' ?pos.bottom:pos.top;
      if (this.bound >=control.top && this.bound <=control.bottom) {
        this.changeEmit(control.value);
        return;
      }
    }
    this.changeEmit(-1);
  }

 calControls(){
  let _newOffC=[];
  this.controls.map(control=>{
    let node=control.el.nativeElement,
    offsetControl:any={};
    let top=this.getAbsoluteTop(node)-this.baseLine-control.baseLine,
    controlAttr:any={
      top:top,
      bottom:top+node.offsetHeight,
      value:control.value,
      over:control.over
    };
    let existsControl=this.offsetControls.find(v=>v.value==control.value);
    if(existsControl){
      Object.assign(existsControl,controlAttr);
      _newOffC.push(existsControl);
    }else{
      _newOffC.push(controlAttr);
    }
    this.offsetControls=_newOffC;
  });

};
  getScrollTop(){
    return document.documentElement.scrollTop||document.querySelector('body').scrollTop;
  }
getScrollEnd(){
  return document.querySelector('body').scrollHeight-window.innerHeight;
}
scrollToNode=(node)=>this.scrollTo2(this.getAbsoluteTop(node)-this.baseLine,false,500,10,true);

scrollTo(value,bottom=false,out=false,t0=200){
  //this.calControls();
  this.storeMsn=null;
  this.stop=true;
  if(value=='ztw_top'){
    if(this.getScrollTop()<=0)return Promise.resolve();
    return this.scrollTo2(0,out,t0);
  };
  let end=this.getScrollEnd();
  if(value=='ztw_bottom'){
    if(this.getScrollTop()>=this.getScrollEnd())return Promise.resolve();
    return this.scrollTo2(-1,out,t0);
  }

  let controlOffset=this.offsetControls.find(i=>i.value==value);
  return this.scrollTo2(bottom?controlOffset.bottom:controlOffset.top+10,out,t0,10,true);
};
scrollTo2(pos:number,out=false,t0=500,vt=10,notBottom?){
  return new Promise(resolve=>{
    let top=this.scrollTop,
      end=document.querySelector('body').scrollHeight-window.innerHeight;
    if(!top)top=this.getScrollTop();
    if(pos>end||pos==-1)pos=notBottom?end-20:end;
    if(pos<0)pos=0;
    let scroll=(state,s,t,fn)=>{
    let a=2*s/(t*t), v0, s0, pt=0,Vmid=0;
    if(s==0)return resolve();
    if(state){
      v0=Math.sqrt(2*a*s);
      if(s<0)v0=0-v0;
    }
    let circle=()=>{
      setTimeout(()=>{
        if(pt>=t){return fn()};
        v0=a*pt;
        pt+=vt;
        v0=(v0+a*pt)/2;
        s0=v0*vt;
        top+=s0;
        window.scrollTo(0,top);
        circle()
      },vt)
    };
    let circle2=()=>{
      setTimeout(()=>{
        if(pt>=t){this.stop=false;return fn()};
        Vmid=v0-a*vt/2;
        s0=Vmid*vt;
        pt+=vt;
        v0=v0-a*vt;
        top+=s0;
        window.scrollTo(0,top);
        circle2()
      },vt)
    };
    state?circle2():circle();
    };
    if(out){
      scroll(true,pos-top,t0,()=>{resolve()});
    }else{
      let sHalf=(pos-top)/2,tHalf=t0/2;
      scroll(false,sHalf,tHalf,()=>{
        scroll(true,sHalf,tHalf,()=>{
          resolve()
        })
      })
    }
  })
}
getAbsoluteTop(node){
  let top=node.offsetTop;
  if(node.offsetParent) top+=this.getAbsoluteTop(node.offsetParent);
  return top;
}
leave(){
  if(this.scrollSub)this.scrollSub.unsubscribe();
  if(this.resizeSub)this.resizeSub.unsubscribe();
  this.scrollSub=null;
  this.resizeSub=null;
}
getControlOffset(value){
  return this.offsetControls.find(v=>v.value==value);
}
registerOnTouched(){};
registerOnChange(fn:any){
  this.emit=fn;
};
writeValue(value){
  //this.offsetControls?this.scrollTo(value):0;
};
ngOnDestroy(){
  this.leave();
}
}
