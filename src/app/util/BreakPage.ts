export interface Result{
  d:Array<any>;
  c:number;
}
export class DateBP{
  pageSize:number;
  set totals(val){
    this.hid=val;
    this.pages=Math.ceil(val/this.pageSize);
  }
  get totals(){return this.hid}
  hid:number;
  pages:number;
  nowPage:number;
  startData:any;
  lastData:any;
  constructor(http,url,pageSize,method='get',params?,totals?){
    this.pageSize=pageSize;
    this.totals=totals;
    let time='cd',direction='dr',findTime='t';
    if(params){
      time=params.time||time;
      direction=params.direction||direction;
      findTime=params.findTime||findTime;
    }
    this.getPage=(query:any={},page,dr?,t0?,all?)=>{
      //dr:null|'next'|'pre'|'end'
      if(!this.totals)query.needC=1;
      if(page==1)dr=null;
      if(dr)query[direction]=dr;
      //t0:prevent default;
      query[findTime]=t0?t0:(dr=='next'?this.lastData:(dr=='pre'?this.startData:null));
      !query[findTime]&&delete query[findTime];
      return http[method](url,query).then((d:Result)=>{
        try{
          const list=d.d,c=d.c;
          this.totals=c||this.totals;
          this.startData = list[0][time];
          this.lastData = list[list.length - 1][time];
          this.nowPage=page;
          const list2:any=(dr=='end'||dr=='pre')?list.reverse():list;
          //all?return total Data;
          return !all?list2:(d.c=list2)&&d;
        }catch(e){return false}
      })
    }
  }
  getPage:any=()=>{};
}
