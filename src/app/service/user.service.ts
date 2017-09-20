import { Injectable } from '@angular/core';
import { TotalService} from './total.service';
import {HttpService} from './http.service';
let common=(window as any).myCommon;
const epArr=common.epArr,epStg=common.epStg;
@Injectable()
export class UserService {
  url:string='/user/manage/upL';
  config:{
    contentLimit:4000,
  };
  user:any;
  constructor(
    private _ts:TotalService,
    private http:HttpService
  ){
    this.user=_ts.userMsn
  }
  post(url,query,stg){
      //stg:publish |reply1|reply2
    return this.http.postWithVf(url,query).then(v=>{
      if(!v)return false;
      return this.appendExp(stg).then(()=>v);
    })
  }
  appendExp(s){
    let user=this.user;
    return new Promise(resolve=>{
      this.getStrategy().then((strategy:any)=>{
        if(!strategy)return resolve(false);
        const epStg=strategy.ep;
        const epArr=epStg.epArr;
        if(typeof s=='string'){
          user.ep+=epStg[s]['ep'];
          user.gold+=epStg[s]['g']||0;
        }else{
          user.ep+=s;
        }
        let diff=user.ep-epArr[user.level-1];
        if(diff>=0&&user.level<=epStg.maxLevel){
          this.http.post(this.url).then(v=>{
            if(v){
              user.level++;
              user.ep=diff;
            }
            resolve(true)
          })
        }else{return resolve(true)}
      });
    })
  };
  strategy:any;
  strategyUrl:string='/gzip-static/strategy.json';
  getStrategy=()=>{
    if (!this.strategy) {
      return this.http.get(this.strategyUrl).then(v=>{
        this.strategy=v;
        return v;
      });
    } else {
      return  Promise.resolve(this.strategy);
    }
  }
}
