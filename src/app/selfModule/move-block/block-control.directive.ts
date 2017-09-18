import { Directive,ElementRef} from '@angular/core';
import {MoveBlockService,ztwDragParent} from './move-block.service';

@Directive({
  selector: '[ztwBlockControl]',
  host:{
    '[draggable]':'!parent.disabled',
    '(dragstart)':'drag($event)',
    '(dragover)':'dragOver($event)',
    '(dragenter)':'dragEnter()',
    '(dragleave)':'dragLeave()',
    '(drop)':'drop()',
    '(dragend)':'dragEnd()'
  }
})
export class BlockControlDirective {
  index:number;
  top:number;
  left:number;
  node:any;
  constructor(
      public _mbs:MoveBlockService,
      private _el:ElementRef,
      private parent:ztwDragParent
  ){
    this.node=this._el.nativeElement;
    this.addTransition(this.node);
  }
  isMe(){
        return this._mbs.selectedIndex==this.index||!this.parent.dataArr;
  }
  dragOver(e){
    e.preventDefault();
    this.dragEnter();
  }
  dragEnter(){
    if(this.isMe())return;
    if(this.parent.disabled)return;
    this._mbs.floatSubject.next(this.index);
  }
  dragLeave(){
    if(this.isMe())return;
    this._mbs.floatSubject.next(-1);
  }
  addTransition(node){
    node.style.transition='transform '+this.parent.duration+'ms';
  }
  restoration(node){
    node.style.transition=null;
    node.style.transform='translate(0px,0px)';
  }
  drag(e){
    if(this.parent.disabled)return;
    e.dataTransfer.setData('1',null); //for firefox;
    this._mbs.selectedIndex=this.index;
    this.parent.dragIndex.emit(this.index);
  }
  dragEnd(){
    this.parent.dragIndex.emit(-1);
  }
  drop(){
    if(this.parent.disabled)return;
    this._mbs.floatSubject.next(-1);
    if(this._mbs.moving)return;
    let selIndex=this._mbs.selectedIndex,data=this.parent.dataArr;
    if(this.isMe())return;
    this._mbs.moving=true;
    let controls=this._mbs.controls,
        nowIndex=this.index,
        nowControl=controls[nowIndex],
        preControl=controls[selIndex],
        preNode=controls[selIndex].node,
        disTop=preControl.top-nowControl.top,
        disLeft=preControl.left-nowControl.left;
      this.addTransition(this.node);
      this.addTransition(preNode);
      this.node.style.transform='translate('+disLeft+'px,'+disTop+'px)';
      preNode.style.transform='translate('+(0-disLeft)+'px,'+(0-disTop)+'px)';
    this.change(controls,nowIndex,selIndex);
    this.exchange(preControl,nowControl);
    setTimeout(()=> {
      this.restoration(this.node);
      this.restoration(preNode);
      this.change(data,nowIndex,selIndex);
      this._mbs.moving=false;
      this.parent.dragOnce.emit(true);
    },this.parent.duration);
  }
  exchange(a,b){
    let arr=['left','top','index'],temp;
    arr.forEach(v=>{
      temp=a[v];
      a[v]=b[v];
      b[v]=temp;
    })
  }
  change(datas,attr1,attr2){
    let temp=datas[attr1];
    datas[attr1]=datas[attr2];
    datas[attr2]=temp;
  }
}
