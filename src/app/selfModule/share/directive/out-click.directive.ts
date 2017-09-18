import { Directive,Input,Output,EventEmitter,ElementRef} from '@angular/core';
import {ToolService}  from '../tool/tool.service';
@Directive({
  selector: '[outclick]'
})
export class OutClickDirective {
  @Output('outClick')outClick:EventEmitter<boolean>=new EventEmitter();
  @Input('bindEvent')bindEvent='click';
  constructor(private el:ElementRef,public _tool:ToolService) {
  }
  ngAfterViewInit(){
    const node=this.el.nativeElement;
    const Event=(e)=>{
        e.stopPropagation();
        this._tool.listenOnce(document,'click',e=>this.outClick.emit(true));
      };
    node.addEventListener(this.bindEvent,Event);
  };
}
