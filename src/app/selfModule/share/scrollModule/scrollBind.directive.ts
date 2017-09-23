import {Directive,Input,ElementRef,Output,EventEmitter} from '@angular/core';
import {ztwScrollParent} from './scroll.service';
@Directive({
	selector:'[ztwScrollControl]',
  exportAs:'ztwScrollControl'
})
export class ScrollBindDirective{
	@Input('ztwScrollControl')value:any;
	@Input()over:boolean;
	@Input()baseLine:number=0;
	@Output('entry')entry:EventEmitter<any>=new EventEmitter();
	outScroll:string;
	offsetSelf:any;
	remainTop:number;
	scrollSelf:any=this.parent.event.map((event:any)=>{
	    if(!this.offsetSelf)this.offsetSelf=this.parent.getControlOffset(this.value);
	    return this.over?event.bottom:event.top;
    });
	stickySub:any;
	@Input()set sticky(val:string){
	    if(val===undefined)return;
	    const node=this.el.nativeElement;
	    const destrop=()=>{
            node.style.position=null;
            node.style.top=null;
        };
	    if(val=='destroy'){
            destrop();
            return;
        }
	    const parent=document.createElement('div');
	    setTimeout(()=>{
	      node.parentNode.insertBefore(parent,node);
	      parent.appendChild(node);
	      const rect=node.getBoundingClientRect();
	      parent.style.height=rect.height+'px';
          if(!this.stickySub){
              this.stickySub=this.scrollSelf.subscribe((v:number)=>{
                  let p=this.parent.getControlOffset(this.value);
                  if(this.remainTop===undefined)this.remainTop=this.offsetSelf.top;
                  if(v>this.offsetSelf.top){
                      node.style.position='fixed';
                      node.style.top=val;
                  }else{
                      destrop();
                  }
              })
          }
        })
    }
    entrySub:any;
	preValue:string;
	@Input('useEntry')set useEntry(v:boolean){
	  if(!v)return;
	  let fn1=(value:any)=>{
          if(value===this.preValue)return;
          this.preValue=value;
          this.entry.emit(value);
      };

    this.entrySub=this.scrollSelf.subscribe((val:number)=>{
        if(val<this.offsetSelf.top){
            fn1('top')
        }else if(val>=this.offsetSelf.top&&val<=this.offsetSelf.bottom){
            fn1('in');
        }else{
            fn1('down');
        }
    })
  }
	constructor(
		private el:ElementRef,
    private parent:ztwScrollParent
  ){}
  ngOnDestroy(){
      this.stickySub&&this.stickySub.unsubscribe();
      this.entrySub&&this.entrySub.unsubscribe();
  }
}
