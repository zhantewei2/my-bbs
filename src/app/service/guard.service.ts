import {Injectable} from '@angular/core';
import {RouterStateSnapshot,Router} from '@angular/router';
import {TotalService} from './total.service';
import {RouterService} from './router.service';
@Injectable()
export class userCanLoad{
  constructor(
    public _ts:TotalService,
    public router:Router,
    public _rs:RouterService
  ){}
  canLoad():Promise<boolean>{
    let userName=this._ts.userMsn.name;
    return this._ts.isLogined().then(v=>{
      if(!v){
        if(userName===undefined) {
          this.router.navigate(['']);
        }else{
          this._rs.openLogin();
        }
      }
      return !!v;
    });
  }
  canActivate():Promise<boolean>{
    return this.canLoad()
  }
}
