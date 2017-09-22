import { Component,OnInit,Input} from '@angular/core';
import {ArticleService} from '../article.service';

export interface voteQuery{
  aId:string;
  rId:number;
  rgId:number;
  b:string;//sup||op;
}
@Component({
  selector: 'ztw-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css']
})
export class VoteComponent implements OnInit {
  voteUrl:string='/user/manage/vote';
  running:boolean=false;
  @Input('msn')parent;
  http:any;
  _ts:any;
  constructor(private _as:ArticleService){
    this.http=_as.http;
    this._ts=_as._ts;
  }
  ngOnInit() {}
  vote(dr){
    if(!this._ts.userMsn.name)return this._ts.alert('请先登录');
    this.running=true;
    let as=this._as;
    let q1=as.getParams('aId','rgId');
    let q2:any={b:dr},rId=this.parent.rId;
    if(rId)q2.rId=rId;
    const query:voteQuery=Object.assign(q1,q2);
    let db=this._as._db.db;

    db.use('vote',{keyPath:'key'}).then(model=>{
      let newQuery:any=Object.assign({},query);
      delete newQuery.rgId;
      newQuery.u=this._as.baseParams.auId;
      const key=model.genKey(newQuery),
        exists=()=>as.throwErr('你已评过了'),
        addToDB=()=>model.insert({key:key},()=>{});
      model.findOne(key,(err,data)=>{
        if(!data){
          this.http.post(this.voteUrl,query).then(result=>{
            if(!result){
              as.throwErr('false');
            }else if(result=='exist'){
              addToDB();
              exists()
            }else{
              as.throwErr('评价成功');
              this.parent[dr]++;
              addToDB();
            }
            this.running=false;
          })
        }else{
          exists();
          this.running=false;
        }
      })

    });

  }
  genkey(){

  }

}
