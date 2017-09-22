import { Injectable,ViewContainerRef,ComponentFactoryResolver} from '@angular/core';
import {ArticleService} from './article.service';
import {InnerReplyComponent} from './inner-reply/inner-reply.component';
@Injectable()
export class InnerReplyService {
  constructor(
    public _as:ArticleService,
    public _cfr:ComponentFactoryResolver
  ) { }
  preContainer:ViewContainerRef;
  insertReply(container:ViewContainerRef,parent,toAu=false){

    if(container==this.preContainer)return;
    let componentFactory=this._cfr.resolveComponentFactory(InnerReplyComponent);
    this.closeReply();
    let componentRef=container.createComponent(componentFactory);
    let params:any={
      close:this.closeReply.bind(this),
      as:this._as,
      parent:parent
    };
    if(toAu)params.otherAu=toAu;
    Object.assign(componentRef.instance,params);
    this._as.resetScroll();
    this.preContainer=container;
  }
  closeReply(){
    if(!this.preContainer)return;
    try{
      this.preContainer.clear();
    }catch(e){}
    this.preContainer=null;
    this._as.resetScroll();
  }
}
