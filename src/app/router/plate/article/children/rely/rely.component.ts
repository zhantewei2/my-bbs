import { Component, OnInit } from '@angular/core';
import {ArticleService} from '../article.service';
import {slideTopToggle,fade} from 'app/selfModule/animations/animate';
import {lzwService} from 'app/service/util.service';

@Component({
  selector: 'article-rely',
  templateUrl: './rely.component.html',
  styleUrls: ['./rely.component.css'],
  animations:[fade(),slideTopToggle()]
})
export class RelyComponent implements OnInit {
  show:boolean=false;
  constructor(
    public _as:ArticleService,
    public lzw:lzwService
  ) {

    this.user=_as._ts.userMsn;
  }
  ngOnInit(){

  }
  running:boolean=false;
  user:any;
  _submit(spy){
    this._as._rs.hasLogined(()=>{
      let html=spy.getHTML(),as=this._as;
      if(!html)return;
      let data:any=as.getParams('rgId','cgId','aId','auId','auName');
      this.running=true;
      data.c=this.lzw.encode(html);
      data.tId=as.au.name;
      as.method.reply(data).then(v=>{
        this.running=false;
        if(!v)return as.throwErr('回复失败');
        data.user=as._ts.userMsn;
        data.user.insert=true;
        data.cd=new Date();
        as.replys[0]['value'].splice(1,0,data);
        as._ts.alert('回复成功');
        as.closeReply();
        as._us.appendExp('reply1');
        if(as.stg&&as.stg.rv)as.refresh();
      })
    })
  }

}
