import { Directive,TemplateRef,Input,ElementRef,ViewContainerRef,Injector,HostListener,ComponentFactoryResolver} from '@angular/core';
import {ToolService} from '../tool/tool.service';
import {TooltipComponent} from './tooltip/tooltip.component';

@Directive({
  selector: '[ztwTooltip]',
  exportAs:'ztwTooltip'
})
export class TooltipDirective {
  @Input()set ztwTooltip(val){
    this.tipTp=val;
    if(typeof val=='string'){
      let self=this._el.nativeElement;
      this.type='def';
      self.classList.add('tpParent');
      let child=document.createElement('div');
      child.className='tpChild tpTop';
      child.innerText=val;
      self.appendChild(child);
    }
  };
  @Input()type:any;//'oc':'def':null
  tipTp:any;
  @Input()placement='top';
  @Input()pure;
  node:any;
  ngOnInit(){
    this._el.nativeElement.addEventListener('click',()=>{this.open()});
  }
  @HostListener('mouseenter')mouseenter(){
    this.type!='def'&&this.open();
  }
  @HostListener('mouseleave')mouseleave(){
    this.type!='oc'&&this.type!='def'&&this.close();
  }
  open(){
    if(this.node||!(this.tipTp instanceof TemplateRef))return;
    const viewRef = this._vcr.createEmbeddedView(this.tipTp);
    const componentFactory = this._cfr.resolveComponentFactory(TooltipComponent);
    const componentRef = this._vcr.createComponent(componentFactory, 0, this.injector, [viewRef.rootNodes]);
    let node=this.node = componentRef.location.nativeElement;
    //tcTop|tcLeft...;
    document.querySelector('body').appendChild(node);
    this._tool.nextTick(()=>{
      node.classList.remove('hid0');
      componentRef.instance.pure=this.pure;
      componentRef.instance.pos=this._tool.tooltipPos(this._el.nativeElement,node,this.placement);
      this.type&&this._tool.listenOnce(document,'click',this.close.bind(this));
    })
  }
  close(){
    if(this.node){
      this.node.parentNode.removeChild(this.node);
      this.node=null;
    }
  }
  constructor(
    private _el:ElementRef,
    private _cfr:ComponentFactoryResolver,
    private _vcr:ViewContainerRef,
    private injector:Injector,
    public _tool:ToolService
  ) {}
  ngOnDestroy(){this.close()}
}
