import { Component, OnInit,Input} from '@angular/core';
import { AdminService} from '../../admin.service';
import {DateBP} from 'app/util/BreakPage';
const transactionUser=(window as any).myRefer.transactionUser;
const reply2Ps=(window as any).myCommon.reply2Ps;
interface delReply2Query{
  pos:number; //rgId;
  rId:number;
  aId:any;
  auId:string;
  cd:any;
  In?:number;
}
interface getReply2Query{
  aId:any;
  rId:number;
  rgId:number;
  dr:any;
}
interface removeAllReplyQuery{
  pos:number;
  rId:number;
  aId:any;
  all?:any;
}

@Component({
  selector: 'reply-card',
  templateUrl: './reply-card.component.html',
  styleUrls: ['./reply-card.component.css']
})
export class ReplyCardComponent implements OnInit {
  deleteReply2Url:string='/admin6/delReply2';
  getReply2Url:string='/admin6/viewReply2';
  putImg:any=(window as any).myCommon.putImg;
  user:any;
  _i:any;
  @Input()set i(val){
    this._i=val;
    this.user=transactionUser(val.user);
  };
  constructor(
    public _admin:AdminService
  ){}
  compress:any=this._admin._compress;
  ngOnInit() {
  }
  getBaseQuery():removeAllReplyQuery{
    return {
      pos:this._admin.articleSelectRgId,
      rId:this._i.rId,
      aId:this._admin.articleSelectAId
    }
  }
  removeReply2(msn,isIn){
    this._admin.modalContent={content:`确认删除<code>${msn.auName}</code>的回复`,btnType:'double'};
    this._admin.modalResult=(e)=>{
      if(!e)return;
      const query:delReply2Query=Object.assign({
        auId:msn.auId,
        cd:msn.cd
      },this.getBaseQuery());
      if(isIn)query.In=isIn;
      this._admin.http.post(this.deleteReply2Url,query).then(v=>{
        console.log(v);
      })
    };
    this._admin.modal.open();
  }
  isViewOther:boolean=false;
  otherReplyBP:DateBP;
  otherReplyList:Array<any>;
  viewOther(){
    this.isViewOther?this.otherReplyList=null:this.getReply2Page(1);
    this.isViewOther=!this.isViewOther;
  }
  getReply2Page(page,dr=null){
    if(!this.otherReplyBP){
      this.otherReplyBP=new DateBP(
        this._admin.http,
        this.getReply2Url,
        reply2Ps,
        'post'
      )
    }
    const query:any={
      rId:this._i.rId,
      aId:this._admin.articleSelectAId,
      rgId:this._admin.articleSelectRgId
    };
    this.otherReplyBP.getPage(query,page,dr).then(v=>{
      if(!v)return this._admin.throwErr('没有了~请重新刷新！');
      this.otherReplyList=v;
    });
  }
  clearAllReply2(){
    this._admin.modalContent={content:"将清除该区域的所有nested replies!",btnType:'double'};
    this._admin.modalResult=(e)=>{
      if(!e)return;
      const query:removeAllReplyQuery=this.getBaseQuery();
      query.all=1;
      this._admin.http.post(this.deleteReply2Url,query).then(v=>{
        if(!v)return this._admin.throwErr('删除失败');
        this._admin.throwErr('已经清除所有回复');
        this._i.rCache={cs:0,mbs:[]};
      });
    };
    this._admin.modal.open();
  }

}
