import { Component, OnInit,Input,ElementRef,HostBinding} from '@angular/core';

@Component({
  selector: 'ztw-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css'],
  host:{
    '[style.display]':'!!bind?"inline-block":"none"'
  }
})

/*
  coverage class='loadHid';
*/
export class LoadingComponent implements OnInit {
  @Input()bind:boolean=false;
  @Input()cg;
  @Input('transparent')set tspFn(val){
    if(val===undefined)val=1;
    this.bg='rgba(255,255,255,'+val+')'
  };
  @Input()noCheck:boolean=false;
  bg:any;
  @Input('color')color:String='primary';
  @Input('size')size2;
  @Input('fontSize')size:any='1.5rem';
  @Input('pos')set fn(value){
    if(!value)return;
    let node=this.el.nativeElement,
      parent=node.parentNode;
    node.style.position='absolute';
    if(!this.noCheck)parent.style.position='relative';
    switch(value){
      case 'tr':
      node.style.right=0;
      break;
      case 'full':
        setTimeout(()=>{
          let w=parent.clientWidth,h=parent.clientHeight;
          w=Math.min(w,h);
          this.size=this.size2||(w/2+'px');
        },1);
        node.className=node.className+' full';
        break;
    }

  }
  constructor(
    private el:ElementRef
  ){}

  ngOnInit() {
  }

}
