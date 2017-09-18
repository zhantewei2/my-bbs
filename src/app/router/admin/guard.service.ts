import { Injectable } from '@angular/core';
import {TotalService} from 'app/service/total.service';
@Injectable()
export class GuardService {
  constructor(private _ts:TotalService){}
  canActivate():Promise<boolean>{
    return this._ts.isLogined().then(v=>{
      if(!v)return false;
      let type1=this._ts.userMsn.type;
      return type1=='manager'||type1=='admin';
    })
  }
}
