const cachePage=6;
export class _bk{
  nowPage:number;
  loadPages:number=0;
  loadPage:number;
  cachePages:number=cachePage;
  topPage:number=null;
  bottomPage:number=null;
  pageSize:number=10;
  hid:number;
  set totals(val){
    if(val==this.hid)return;
     this.hid=val;
     this.pages=Math.ceil(val/this.pageSize);
  }
  get totals():number{
    return this.hid;
  }
  pages:number=null;
}
export class BreakPage{
  bk:_bk;
  constructor(){
    this.bk=new _bk()
  }
  getBP=()=>this.bk;
  reset=()=>Object.assign(this.bk,new _bk());
}
