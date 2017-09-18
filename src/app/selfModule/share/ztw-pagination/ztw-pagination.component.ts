import { Component, OnInit,Input,Output,EventEmitter} from '@angular/core';
import {slideXToggle} from 'app/selfModule/animations/animate';
/*
 <ztw-pagination [navSize]="" [colles]="" [nowPage]="" (selectPage)="" pageSize?=10></ztw-pagination>
 */
@Component({
  selector: 'ztw-pagination',
  templateUrl: './ztw-pagination.component.html',
  styleUrls: ['./ztw-pagination.component.css'],
  animations:[slideXToggle()]
})
export class ZtwPaginationComponent implements OnInit {
  isOdd=(num)=>num%2;
  show:boolean;
  @Input()pageSize=10;
  @Input()nowPage;
  @Input()set navSize(val){
    if(!val)return;

    this._navSize=val;
    if(this.isOdd(val)){
      this.baseR=this.baseL=Math.floor(val/2);
    }else{
      this.baseR=val/2;
      this.baseL=this.baseR-1;
    }
  };
  @Input()set colles(val){
    if(val===0)this.pages=1;
    if(!val)return;
    this.pages=Math.ceil(val/this.pageSize);
  };
  @Output('selectPage')selectPage:EventEmitter<number>=new EventEmitter();
  @Input()set complete(val){this.loading=false};
  _navSize:number;
  baseR:number;
  baseL:number;
  btnArr:Array<number>=[];
  pages:number;
  _nowPage:number;
  loading:boolean=false;
  unlock(){this.loading=false};
  constructor(){ }
  btn='btn btn0-inverse';
  ngOnInit() {}
  emit(e){
    if(e==this._nowPage)return;
    this.selectPage.emit(e);
    this.loading=true;
  }
  ngOnChanges(){
    setTimeout(()=>{
      const pages=this.pages,
        navSize=this._navSize,
        baseL=this.baseL,
        baseR=this.baseR,
        val=this.nowPage;
      if(!navSize||!pages||!val)return;
      this.show=true;
      let max,min=1;
      if(navSize>=pages){
        max=pages;
      }else if(val<=baseL){
        max=navSize;
      }else if(val>=pages-baseR){
        max=pages;
        min=pages-navSize+1;
      }else{
        max=val+baseR;
        min=val-baseL;
      }
      let arr=[];
      for(let i=min;i<=max;i++){
        arr.push(i);
      }
      this.btnArr=arr;
      this._nowPage=val;
      this.loading=false;
    },1)
  }
}
