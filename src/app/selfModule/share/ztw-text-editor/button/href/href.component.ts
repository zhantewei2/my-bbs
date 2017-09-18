import { Component,ViewChild,HostBinding,HostListener} from '@angular/core';
import  {parent} from '../../total.service';
@Component({
  selector: 'ztw-href',
  templateUrl: './href.component.html',
  styleUrls: ['./href.component.css']
})
export class HrefComponent{
  @ViewChild('tp')tp;
  @HostBinding('class')hostClass='btn0 btn-icon';
  originText='http://';
  hrefText:string=this.originText;
  inputNode:any;
  preRange:any;
  inputDisabled:boolean=true;
  focus(){
    if(!this.preRange)return;
    let sel=window.getSelection();
    sel.removeAllRanges();
    sel.addRange(this.preRange);
    this.preRange=null;
  }
  @HostListener('mousedown',['$event'])hostdown(e){
    e.preventDefault();
  }
  @HostListener('click')hostClick(){
    this.parent.modal.getResult(this.tp,'chain',true).then((range:any)=>{
      if(!range)return;
      if(!range||(range.startContainer==range.endContainer&&range.startOffset==range.endOffset)){
        this.inputDisabled=true;
      }else{
        this.inputDisabled=false;
      }
    });
    setTimeout(()=>{
      let node:any=this.inputNode=document.getElementById('ztw-text-editor-href-input');
      node.focus();
      node.setSelectionRange(0,this.hrefText.length);
    },100);
  }
  constructor(
    private parent:parent
  ) {}
  test:string='true';
  confirm(){
    this.parent.modal.close();
    document.execCommand('createLink',false,this.hrefText);
  }
  cancel(){
    this.hrefText=this.originText;
    this.parent.modal.close();
  }
}
