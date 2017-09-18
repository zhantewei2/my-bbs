import { Component, ViewContainerRef,OnInit,Input,ViewChild,ElementRef} from '@angular/core';
import {ArticleService} from '../article/children/article.service';
import {lzwService} from 'app/service/util.service';
import {fade} from 'app/selfModule/animations/animate';
import {ResizeService} from 'app/service/resize.service';
import {InnerReplyService} from '../article/children/inner-reply.service';
import {RouterService} from 'app/service/router.service';
const putImg=(window as any).myCommon.putImg;
const transactionUser=(window as any).myRefer.transactionUser;
@Component({
  selector: 'plate-user-card',
  templateUrl: './plate-user-card.component.html',
  styleUrls: ['./plate-user-card.component.css'],
  animations:[fade()]
})
export class PlateUserCardComponent implements OnInit {
  @Input('msn')set fn(val){
    if(!val)return;
    val.c=val.c&&this.lzw.decode(val.c);
    this.i=val;
    let user=val.user;
    if(user){
      this.insert=user.insert;
      this.user=user.insert?user:this.tsu(val.user);
    }
    const as=this._as,
    auName=as.au.name;
    this.isMain=auName==user._id;
    this.isMaster=as._ts.userMsn.name==auName;
    this.isHost=!val.rId&&!this.insert;
    if(val.rId)this._el.nativeElement.id='reply'+val.rId;
  };
  isMain:boolean;
  isMaster:boolean;
  isHost:boolean;
  insert:boolean=false;
  newReply:any;
  @Input()master=true;
  putImg:any;
  dateType:string='M-d H:m';

  i:any;
  user:any;
  tsu:any;
  constructor(
    public _as:ArticleService,
    public lzw:lzwService,
    public _reS:ResizeService,
    public _irs:InnerReplyService,
    private _el:ElementRef,
    public _rs:RouterService
  ) {
    this.putImg=putImg;
    this.tsu=transactionUser;
  }
  @ViewChild('inner',{read:ViewContainerRef})inner;
  ngOnInit() {}
  innerReply(vcr){
    if(this.insert)return;
    this._irs.insertReply(vcr.vcr,this);
  }

}
