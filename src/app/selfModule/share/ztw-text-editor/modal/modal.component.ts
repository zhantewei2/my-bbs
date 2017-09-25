import { Component,ViewContainerRef,TemplateRef,ViewChild,HostBinding,HostListener} from '@angular/core';
import {fadeToggle} from '../../../animations/animate';
import {parent} from '../total.service';
import {Subject} from 'rxjs/Subject';
@Component({
  selector: 'ztw-text-editor-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  animations:[
    fadeToggle()
  ],
  host:{
    'class':'abs center full text-modal-container'
  }
})
export class ModalComponent{
  constructor(
    public parent:parent
  ) { }
  containerTitle:string;
  @HostBinding('@FadeToggle')show:string='hidden';
  @HostListener('click')hostClick(){
    this.close();
  }
  @ViewChild('container',{read:ViewContainerRef})container;
  sub:any;
  preRange:any;
  closeSubject:Subject<number>=new Subject();
  innerText:string;
  focus(){
    if(!this.preRange)return;
    let sel=window.getSelection();
    sel.removeAllRanges();
    sel.addRange(this.preRange);
    this.preRange=null;
  }
  appendComponent(data,title){
    this.container.clear();
    this.innerText=null;
    if(data instanceof TemplateRef){
      this.container.createEmbeddedView(data);
    }else{
      this.innerText=data;
    }
    this.containerTitle=title;
    setTimeout(()=>{
      this.show='show';
    },1)
  }
  getResult(component,title,useFocus=false){
    return new Promise(resolve=>{
      if(this.show=='show'){
        this.close();
        return resolve(false);
      }
      this.appendComponent(component,title);
      if (useFocus) {
        let range;
        try {
          range = window.getSelection().getRangeAt(0);
        } catch (e) {}
        if (!range)return resolve(false);
        if (!this.parent.findParent(range.startContainer))return resolve(false);
        this.preRange = range;
        return resolve(range);
      }
      return resolve(false);
    });
  }
  close(){
    if(this.sub){
      this.sub.unsubscribe();
      this.sub=null;
    }
    if(this.preRange)this.focus();
    this.show='hidden';
    this.closeSubject.next(1);
  }
}
