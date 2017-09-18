import { Directive,ElementRef} from '@angular/core';

@Directive({
  selector: '[preventSpace]'
})
export class PreventPressSpaceDirective {
  constructor(private el:ElementRef){
    const node=this.el.nativeElement;
    node.addEventListener('keydown',(e)=>{
      if(e.key==' ')e.preventDefault();
    });
    node.addEventListener('paste',function(e){
      e.preventDefault();
      let data=e.clipboardData.getData('text/plain');
      data=data.replace(/\s+/g,'');
      let start=this.selectionStart,end=this.selectionEnd,v=this.value;
      this.value=v.slice(0,start)+data+v.slice(end);
    })
  }
}
