import { Component,OnInit,Input,Output,EventEmitter,ViewChild,ViewContainerRef,TemplateRef} from '@angular/core';
import {slideRightToggle} from 'app/selfModule/animations/animate';
/*
  1:<ztw-modal> body</ztw-modal>
  2:<ztw-modal [content]='tp'></ztw-modal>
    <ng-template #tp> </ng-template>
  3:<ztw-modal [content] =  ' str || {type?: ,content:  ,title?:   ,btnType:'single'||'double' , lg :boolean }'> </ztw-modal>
*/

@Component({
  selector: 'ztw-modal',
  templateUrl: './ztw-modal.component.html',
  styleUrls: ['./ztw-modal.component.css'],
  animations:[slideRightToggle('0.2s ease-out',{transform:'translateX(-20%)',opacity:0})]
})
export class ZtwModalComponent {
  @Input('title')title:string='';
  modalTp:any;
  @Input('useFooter')set footerFn(val:any){
    if(!val)return;
    this.useFooter=true;
    if(typeof val=='string')this.btnType=val;
  };
  useFooter:boolean=false;
  @Input('content')set contentFn(val:any){
    if(!val)return;
    this.reset();
    if(val instanceof TemplateRef){
      this.modalTp=val;
    }else if(typeof val==='string'){
      this.content=val;
      this.lg=false;
    }else if(typeof val==='object'){
      this.content=val.content;
      if(val.type){
        this.type=val.type;
        this.setIcon();
      }
      if(val.lg!==undefined)this._lg=val.lg;
      if(val.title)this.title=val.title;
      if(val.btnType)this.btnType=val.btnType;
    }
  };
  reset(){
    this.modalTp=null;
    this.content=null;
    this._lg=this.olg!==undefined?this.olg:null;
    this.type='primary';
    this.btnType='single';
  }
  @Input('btnType')btnType:string='single'; // 'single' || 'double';
  typeIcon:string;
  content:any;
  @Input('type')type:string='primary';
  @Output('confirm')confirm:any=new EventEmitter();
  @ViewChild('container',{read:ViewContainerRef})container;
  @Input('lg')set lg(val){
    this.olg=this._lg=val;
  }
  olg:boolean;
  _lg:boolean=true;
  state:string;
  bgShow:boolean=false;
  setIcon(){
    let type=this.type,icon='fa ';
    switch(type){
      case 'info':
        icon+='fa-warning';
        break;
      case 'danger':
        icon+='fa-warning';
        break;
      case 'primary':
        icon+='fa-bookmark-o';
        break;
      case 'success':
        icon+='fa-hand-peace-o';
    }
    this.typeIcon=icon;
  }
  constructor() { }
  ngOnInit(){
    this.setIcon();
  }
  open(){
    this.bgShow=true;
    setTimeout(()=>{
      this.state='show';
      if(this.modalTp){
        this.container.createEmbeddedView(this.modalTp);
      }else{
        this.container.clear();
      }
    },1)
  }
  close(){
    this.state='hidden';
  }
  anEnd(){
    if(this.state=='hidden'){
      this.bgShow=false;
      this.state=null;
      if(this.modalTp)this.container.clear();
    }
  }
}
