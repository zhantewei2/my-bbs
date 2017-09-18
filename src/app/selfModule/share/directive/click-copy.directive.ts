import { Directive,ElementRef,Output,EventEmitter,Input} from '@angular/core';

@Directive({
  selector: '[clickCopy]',
  host:{
    '(click)':'copy()'
  }
})
export class ClickCopyDirective {
  @Input('clickCopy')copyData:any;
  @Output()complete:EventEmitter<any>=new EventEmitter();
  constructor(
    private el :ElementRef
  ){}
  copy(){
    let node=this.el.nativeElement;
    let hid=this.getHidNode();
    node.appendChild(hid);
    let r=document.createRange();
    r.selectNode(hid);
    let w=window.getSelection();
    w.removeAllRanges();
    w.addRange(r);
    document.execCommand('copy');
    this.complete.emit();
    node.removeChild(hid);
  }
  getHidNode(){
    let hid=document.createElement('p');
    hid.style.position='absolute';
    hid.style.opacity='0';
    hid.style.width='0';
    hid.innerText=this.copyData;
    return hid;
  }
}
