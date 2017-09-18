import { Component,Input,OnInit,ElementRef,ViewChild,Output,EventEmitter} from '@angular/core';
import {ToolService} from '../tool/tool.service';
@Component({
  selector: 'ztw-scroll-vf',
  templateUrl: './scroll-vf.component.html',
  styleUrls: ['./scroll-vf.component.css']
})
export class ScrollVfComponent implements OnInit {
  constructor(
    private el:ElementRef,
    public _tool:ToolService
  ) { }
  @ViewChild('canvas1')canvas1;
  @ViewChild('canvas2')canvas2;
  @ViewChild('block')block;
  @Output('pass')pass:EventEmitter<boolean>=new EventEmitter();
  ctx1:any;
  ctx2:any;
  img:any;
  dragging:boolean=false;
  loading:boolean=true;
  @Input('count')count:any=0; //auto;
  @Input('imgUrl')set fn(url){
    if(!url)return;
    let next=()=>{
      this.loading=true;
      let img=this.img=new Image();
      img.src=url;
      img.onload=()=>{
        this.loading=false;
        this.newStage();
      }
    };
    if(!this.r){
      this.setBase().then(()=>{next()});
    }else{next()}
  };
  cvW:number;
  cvH:number;
  barH:number;
  r:number;
  data:any;
  right:boolean=false;
  moveDestroy:any;
  ngOnInit(){
    // drag block :
    let block=this.block.nativeElement,
      body=document.querySelector('body'),
      width,parentLeft,x;
    this.moveDestroy=this._tool.ztwMove(block,
      ()=>{
        parentLeft=block.parentNode.getBoundingClientRect().left;
        width=block.offsetWidth;
      },
      (e)=>{
        x=e.x-parentLeft;
        if(x<0||x+width>this.cvW)return;
        block.style.left=x+'px';
        this.emitX(x);
      },
      ()=>this.pass.emit(this.right)
    )
  }
  ngOnDestroy(){
    this.moveDestroy();
  }
  emitX(x){}
  clear(ctx){
    ctx.clearRect(0,0,this.cvW,this.cvH);
  };
  update(){
    this.clear(this.ctx1);
    this.clear(this.ctx2);
    this.newStage();
    this.block.nativeElement.style.left=0;
  }
  newStage(){
    let r=this.r,
      h=this.cvH,
      w=this.cvW,
      ctx1=this.ctx1,
      ctx2=this.ctx2;
    let x=this.random(r,w)+10,
      y=this.random(r,h),
      rightX=x-r;
    this.confCanvas(x,y,r,w,h);
    this.emitX=(xm)=>{
      this.clear(ctx2);
      ctx2.putImageData(this.data,xm,y-r);
      this.right=(Math.abs(xm-rightX)<5);
    }

  }
  confCanvas(x,y,r,w,h){
    let ctx1=this.ctx1,
      ctx2=this.ctx2,
      prePath=ctx1.save(),
      count;
    count=this.count||Math.ceil(Math.random()*6)+6;
    this.drawStar(ctx1,x,y,r,count);
    ctx1.stroke();
    ctx1.clip();
    ctx1.drawImage(this.img,0,0,w,h);
    let data=this.data=ctx1.getImageData(x-r,y-r,x*2,y*2);
    ctx1.restore(prePath);
    this.clear(ctx1);
    ctx1.drawImage(this.img,0,0,w,h);
    ctx1.fillStyle='white';
    this.drawStar(ctx1,x,y,r,count);
    ctx1.shadowBlur=20;
    ctx1.shadowColor='gray';
    ctx1.fill();
    //conf canvas2:

    ctx2.putImageData(data,0,y-r);
  }
  setBase():Promise<any>{
    return new Promise(resolve=>{
      setTimeout(()=>{
      let host=this.el.nativeElement,
        w=host.clientWidth,
        h=host.offsetHeight;
      this.cvW=w;
      this.barH=h*0.2<30?30:h*0.2;
      h=this.cvH=h-this.barH;
      this.r=h/7*2;
      this.ctx1=this.canvas1.nativeElement.getContext('2d');
      this.ctx2=this.canvas2.nativeElement.getContext('2d');
      resolve(1);
      },1)
    })
  }
  random(r,len){
    let start=r,end=len-r;
    len=end-start;
    return Math.random()*len+start;
  }
  drawStar(ctx,x,y,r,count=10){
    let beginA=Math.PI/2*3,perA=Math.PI*6/count;
    ctx.beginPath();
    for(let i=0;i<=count;i++){
      let nowA=beginA+perA*i,
        x1=Math.cos(nowA)*r+x,
        y1=Math.sin(nowA)*r+y;
        i?ctx.lineTo(x1,y1):ctx.moveTo(x1,y1);
    }
  }
}
