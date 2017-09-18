import { Directive,Input,ViewContainerRef,TemplateRef} from '@angular/core';

@Directive({
  selector: '[ztwForIn]'
})
export class ZtwForInDirective {
  preObj:any;
  @Input()set ztwForIn(obj:any){
    if(!(obj instanceof Object))return;
    if(obj!=this.preObj)this._vcr.clear();
    this.preObj=obj;
    for(let i in obj){
      const viewRef=this._vcr.createEmbeddedView(this._tp);
      viewRef.context.$implicit=obj[i];
      viewRef.context.key=i;
    }
  }
  constructor(
    private _vcr:ViewContainerRef,
    private _tp:TemplateRef<any>
  ){}
}
