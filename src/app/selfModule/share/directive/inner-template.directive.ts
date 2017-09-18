import { Directive ,Input,ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[innerTemplate]'
})
export class InnerTemplateDirective {
  @Input()deps:any;
  pre:any;
  @Input('innerTemplate')set fn(val){
    if(!val||val==this.pre){
      this.pre=val===null?this._vcf.clear()||null:this.pre;
      return
    }
    if(this.pre)this._vcf.clear();
    let viewRef=this._vcf.createEmbeddedView(val);
    if(this.deps)Object.assign(viewRef.context,this.deps);
    this.pre=val;
  }
  constructor(private _vcf:ViewContainerRef) { }

}
