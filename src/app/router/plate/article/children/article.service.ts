import { Injectable } from '@angular/core';
import {TotalService} from 'app/service/total.service';
import {HttpService} from 'app/service/http.service';
import {CacheArticle,Query} from './cacheArticle';
import {RouterService} from 'app/service/router.service';
import {BreakPage,_bk} from './article-break-page';
import {UserService} from 'app/service/user.service';
import {DataBaseService} from 'app/service/data-base.service';
const selectParams=(window as any).myObj.selectParams,
  refer=(window as any).myRefer;
export interface RgMsn{
  cgId:any;
  cgName:any;
  rgId:any;
  rgName:any;
}
export interface replyList{
  index:number;
  value:any;
}
export interface BaseParams{
  cgId:number;
  rgId:number;
  auId?:string;
  auName?:string;
  aId:string;
}

@Injectable()
export class ArticleService {
  url:any={
    viewPlate:'/router/viewPlate',
    reply:'/user/manage/reply',
    getReply:'/router/getReply'
  };
  constructor(
    public _ts:TotalService,
    public http:HttpService,
    public _rs:RouterService,
    public _us:UserService,
    public _db:DataBaseService
  ) {}
  cacheTool:CacheArticle;
  _BK:BreakPage=new BreakPage();
  breakPage:_bk=this._BK.getBP();
  minModal:any;
  ztwScroll:any;
  au:any;
  stg:any;
  id:any={
    pre:null,
    now:null
  };
  set aId(val){
    let id=this.id;
    id.pre=id.now;
    id.now=val;
  }
  get aId(){
    return this.id.now;
  }
  rgMsn:RgMsn;
  title:string;
  datePipe:string='M/d/y H:m:s';
  replys:Array<replyList>=[];
  config:any;
  throwErr=(e)=>this._ts.throwErr(e);
  baseParams:BaseParams;
  getParams=(...args)=>selectParams(this.baseParams,args);

  init:any=(msn,aId,nowPage,next?)=>{
    this.rgMsn=msn;
    this.aId=aId;
    let userMsn=this._ts.userMsn;
    this._ts.isLogined().then(v=>{
      this.baseParams={
        cgId:msn.cgId,
        rgId:msn.rgId,
        auId:userMsn.name,
        auName:userMsn.nickN,
        aId:aId
      };
      this.method.getReply(this.breakPage.nowPage=nowPage,false,true).then(v=>next&&next());
    })
  };
  state:any={
    pageLoad:false,
    preventWhenBound:false,
    hidPagination:false
  };
  method:any={
    newList:(v,loadPage)=>{
      return {
        index:loadPage,
        value:v
      }
    },
    reply:(query)=>{
      return this._us.post(this.url.reply,query,'reply1');
    },
    initPage:(articleData)=>{
      this.replys=[];
      this.title=articleData.t;
      this.breakPage.totals=articleData.rps;
      this.au=refer.transactionUser(articleData.user);
    },
    state:null,
    filterIndex:(index)=>{
      let breakPage=this.breakPage,
        page,
        top=breakPage.topPage,
        bottom=breakPage.bottomPage,
        method=this.method;
      method.state=null;
      if(!top)return method.state=index;
      if(typeof index=='number'){
        if(top-index==1){
          index='up'
        }else if(index-bottom==1){
          index='down';
        }else if(index>=top&&index<=bottom){
          method.state=index;
          return false;
        }else{
          return method.state=index;
        }
      }
      if(index=='down'){
        page=bottom+1;
        method.state='down';
        return page>breakPage.pages?false:page;
      }
      if(index=='up'){
        page=top-1;
        method.state='up';
        return page<1?false:page;
      }
      return index;
    },

    getReply:(index:any,hasFilter=false,first=false,force?)=>{
      let method=this.method;
      let i=hasFilter?index:method.filterIndex(index);
      if(!i)return Promise.resolve(false);
      let state=this.state.pageLoad=method.state;
      let bp=this.breakPage;
      // if index page is in the boundary then return:
      if(!force&&i<=bp.bottomPage&&i>=bp.topPage)return Promise.resolve('exists');
      let query:Query={
        aId:this.aId,
        rgId:this.rgMsn.rgId
      };
      let offset0=(i-1)*bp.pageSize+1;
      let next=new Promise(resolve=>{
        if(first||i==1) {
            this.getHomePage(offset0,(v) => {
              if(!v)return resolve(v);
              if(offset0==1)v.r.unshift(v.d);
              method.initPage(v.d);
              resolve(v.r);
            })
        } else {
          let query: Query = {
            aId: this.aId,
            rgId: this.rgMsn.rgId,
            s:offset0
          };
          this.http.post(this.url.getReply, query, 1000).then(v => {
            resolve(v?v.r:v);
          })
        }
      });
      return next.then(result=>{
        this.state.pageLoad=false;
        if(!result)return this.throwErr('没有找到文章或已被删除');
        this.breakPage.loadPage=i;
        if(typeof state=='number'){
          this.replys=[this.method.newList(result,state)];
          bp.topPage=state;
          bp.bottomPage=state;
          bp.loadPages=1;
        }else{
          let replys=this.replys,index;
          if(bp.loadPages>=bp.cachePages){
            if(state=='down'){
              replys.shift();
              bp.topPage++;
              index=++bp.bottomPage;
            }else{
              replys.pop();
              bp.bottomPage--;
              index=--bp.topPage;
            }
            this.resetScroll();
          }else{
            bp.loadPages++;
            index=state=='down'?++bp.bottomPage:--bp.topPage;
          }
          let list=this.method.newList(result,index);
          state=='down'?replys.push(list):replys.unshift(list);
        }
        setTimeout(()=>this.state.preventWhenBound=false,1);
        return true;
      })
    }
  };
  reply:any={
    show:false
  };
  openReply=()=>{
    this.reply.show=true;
  };
  closeReply=()=>{
    this.reply.show=false;
  };
  getHomePage:any=(start,cb)=>{
    const next=()=>this.cacheTool.getPage(start,v=>cb(v));
    if(!this.cacheTool){
      this._db.isInit().then(()=>{this.cacheTool=new CacheArticle(this,this._db.db);next()})
    }else{next()}
  };
  resetScroll(t=1){
    setTimeout(()=>{this.ztwScroll.calControls()},t);
  }
  clear(){
    this.cacheTool=null;
    this.id.pre=null;
    this.id.now=null;
    this.stg=null;
    this._BK.reset();
  }
  modifyHost(data:any){
    let msn=this.rgMsn;
    data.aId=this.aId;
    this._rs.navToPublish(msn.cgId,msn.rgId,data);
  }
  refresh=()=>{
    this.method.getReply(1,true,true,true);
    this.stg=null;
  };

}
