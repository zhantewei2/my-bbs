import { Component, OnInit,Input} from '@angular/core';
import {HttpService} from 'app/service/http.service';
import {TempDBService} from 'app/service/tempDB/temp-db.service';
import {lzwService} from 'app/service/util.service';
const common=(window as any).myCommon,
  replyCache=common.replyCache,
  reply2Ps=common.reply2Ps;
export interface msn{
  auId:string;
  c:string;
  auName:string;
  cd:string;
}
export interface viewQuery{
  aId:string;
  rgId?:number; //end need;
  inner:number; //1 is innerReply
  rId?:number;
  t?:string; //last or first item time;
  dr?:string; //next | pre;
}

export interface newQuery{

}
@Component({
  selector: 'view-reply2',
  templateUrl: './view-reply2.component.html',
  styleUrls: ['./view-reply2.component.css']
})
export class ViewReply2Component implements OnInit {
  @Input()_parent:any;
  @Input()set newReply(val:msn){
    if(!val)return;
    if(this.selfReplys){
      this.selfReplys.unshift(val);
      this.selfReplys=this.selfReplys.slice(0,2);
    }else{
      this.selfReplys=[val];
    }
  }
  selfReplys:Array<msn>;
  viewUrl:string='/router/getReply';
  cacheSize:number=replyCache;
  constructor(
    private http:HttpService,
    private _tempDB:TempDBService,
    private _lzw:lzwService
  ) {}
  main:any;
  readList:boolean=false;
  list:Array<msn>=[];
  model:any;
  ngOnInit() {
      this.main=this._parent.i.rCache;
      this.count=this.main.cs-this.cacheSize; //reply2 count without cache;
      this.initList();
  }
  isOpen:boolean=false;
  toggleView(){
    this.isOpen?this.closeView():this.openView();
  }
  setScroll(t=1){
    this._parent._as.resetScroll(t);
  }
  closeView(){
    this.isOpen=false;
    this.initList();
    this.setScroll();
  }
  count:number;
  nowPage:number;
  initList(){
    this.list=this.main.mbs;
  }
  openView(){
    this.isOpen=true;
    let model=this._tempDB.use('reply2');
    let mainQuery=JSON.stringify(this.MainQuery());
    let model2=model.find(mainQuery);
    if(!model2){
      model2=new this._tempDB.forwardPageDB(reply2Ps,this.count);
      model.insert(mainQuery,model2);
    }
    this.model=model2;
    this.viewReply2(this.nowPage=1);
  }
  navPage(data:any){
    this.viewReply2(data.page,data.dr);
  }
  viewReply2(page,dr=null){
    let model=this.model;
    ((next)=>{
      let data=model.getPage(page,this.count);
      if (!data)return this.getServer(dr).then(v =>{model.setPage(page,this.count,v);next(v)});
      return next(data);
    })((v)=>{
      this.list=page==1?this.main.mbs.concat(v):v;
      this.nowPage=page;
      this.setScroll();
    })
  }
  MainQuery():viewQuery{
    let parent=this._parent;
    return {
      aId:parent._as.aId,
      rId:parent.i.rId,
      inner:1
    }
  }
  getQuery(direction?:any){
    let query=this.MainQuery();
    let list=this.list;
    if(direction=='next'){
      query.t=list[list.length-1].cd;
    }else if(direction=='pre'){
      query.t=list[0].cd;
    }
    if(direction)query.dr=direction;
    return query;
  }
  getServer(direction:any=false){
    let query:viewQuery=this.getQuery(direction);
    if(direction=='end')query.rgId=this._parent._as.rgMsn.rgId;
    return this.http.post(this.viewUrl,query).then(v=>{
      if(!v)return v;
      if(direction=='pre')return v.reverse();
      if(direction=='end'){
        this.count=v.colles;
        return v.data.reverse();
      }
      return v;
    });
  }
  preTp;
  reply(vcr,toAu){
    this._parent._irs.insertReply(vcr.vcr,this._parent,toAu);
  }
}
