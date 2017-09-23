import { Component,Input } from '@angular/core';
import {ArticleService} from '../article.service';
import {lzwService} from 'app/service/util.service';
import {DataBaseService} from 'app/service/data-base.service';
export interface Query{
  aId:string;
  rgId:number;
  p?:number;//pay
  i?:string;//voteItem name
}
const toArr=(window as any).myObj.toArray;

@Component({
  selector: 'article-strategy',
  templateUrl: './article-strategy.component.html',
  styleUrls: ['./article-strategy.component.css']
})
export class ArticleStrategyComponent{

  gN:string=(window as any).myRefer.userList['gold'];
  stgUrl:string='/user/manage/stg';
  pattern:any;
  content:any;
  stg:any;
  title:any;
  lock:boolean;
  voteList:any;
  maxVote:number;
  running:boolean;
  voteNum:number;
  maxVoteN:string;
  @Input()set i(val){
    if(!val)return;
    this.stg=val.stg;
    let p,t;
    if(val.nStg)this.lock=true;
    if(val.nStg=='rv'){
      t='以下内容需回复可见！';
      p='rv';
    }else if(val.nStg=='p'){
      t='以下内容需支付可见!';
      p='p';
    }else if(val.c2){
      t=val.stg?'您已购买该贴:':'您已回复该帖:';
      this.content=this._lzw.decode(val.c2);
      p='c';
      this.lock=false;
    }else if(val.stg){
      t='投票';
      p='v';
      const voteMsn=val.stg.v.v;
      this.voteList=toArr(voteMsn);
      this.comVote();
    }
    this.pattern=p;
    this.title=t;
  }
  comVote(){
    let max=-1,totals=0,mostN;
    this.voteList.forEach(v=>{
      let val=v.value;
      if(val>max){
        max=val;
        mostN=v.name;
      }
      totals+=val;
    });
    this.maxVote=max||1;
    this.voteNum=totals;
    this.maxVoteN=mostN;
  }
  constructor(
    public _as:ArticleService,
    public _lzw:lzwService,
    public _db:DataBaseService
  ) { }
  put(num,isVote?){

    const as=this._as;
    let content,end,query:any=as.getParams('aId','rgId');
    let next=(title)=>{
      as._ts.modal(
        {content:content,btnType:'double'},
        (e)=>{
          if(e){
            as._rs.hasLogined(() => {
              this.running=true;
              as.http.postWithVf(this.stgUrl, query).then(v => {
                this.running = false;
                !v?as._ts.throwErr(title):end();
              });
            })
          }
        }
      );
    };

    if(!isVote){
      content=`确认支付<code>${num}</code>个${this.gN},来查看隐蔽内容?`;
      query.p=num;
      const gold=as._ts.userMsn.gold;
      if(gold<num)return as._ts.throwErr(`${this.gN}不足以支付!`);
      end=()=>{
        as._ts.alert('支付成功!');
        as._ts.userMsn.gold-=num;
        as.refresh();
      };
      next('支付失败');
    }else{
      this._db.useModel('stVote').then((model:any)=>{
        const msn:any=as.getParams('rgId','auId','aId');
        const key=msn.auId+msn.aId;
        model.findOne(key,(err,data)=>{
          if(data)return as._ts.throwErr('你已经投过了!')&&(this.running=false);
          content=`确认为${num}投票`;
          query.i=num;
          end=()=>{
            model.purePut({key:key},()=>{
              as._ts.alert('投票成功!');
              this.voteList.find(v=>v.name==num).value++;
            });
          };
          next('投票失败或已投过');
        });
      })
    }

  }
  uId:any;
  ngOnInit(){
    this.uId=this._as.getParams('auId')['auId'];
  }

}
