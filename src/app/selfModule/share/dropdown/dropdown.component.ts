import {Directive,ViewContainerRef,ElementRef,Input,TemplateRef} from '@angular/core';
import {ToolService} from '../tool/tool.service';

@Directive({
  selector: '[ztw-dropdown]',
  host:{
    '(click)':'open()',
    'class':'parent'
  },
  exportAs:'ztw-dropdown'
})
export class ztwDropdown{
  @Input()placement;
  @Input()pure;
  menuControl:any;
  open=()=>this.menuControl.open();
  close=()=>this.menuControl.close();
}

@Directive({
  selector:'[ztw-dropdown-menu]'
})
export class dropDownMenu{
  constructor(
    private _vcr:ViewContainerRef,
    private _tp:TemplateRef<any>,
    public _drop:ztwDropdown,
    public _tool:ToolService,
    private _el:ElementRef
  ){
    _drop.menuControl=this;
  }

  isOpen:boolean;
  open(){
    if(this.isOpen)return;
    const viewRef=this._vcr.createEmbeddedView(this._tp),
      node=viewRef.rootNodes[0],
      pm=this._drop.placement,
      classArr=this._drop.pure?[]:['listItem','card-2'];
    classArr.push(pm?pm:'tpBottom1');
    node.classList.add.apply(node.classList,classArr);

    this.isOpen=true;
    this._tool.nextTick(()=>{
      this._tool.listenOnce(document,'click',this.close.bind(this));
    })
  }
  close(){
    this._vcr.clear();
    this.isOpen=false;
  }
}
