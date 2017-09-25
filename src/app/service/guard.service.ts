import {Injectable} from '@angular/core';
import {RouterStateSnapshot,Router,CanDeactivate} from '@angular/router';
import {TotalService} from './total.service';
import {RouterService} from './router.service';
import {PublishComponent} from '../router/plate/publish/publish.component';
@Injectable()
export class userCanLoad implements  CanDeactivate<PublishComponent>{
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
          this.router.navigate(['/']);
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
  canDeactivate(component:PublishComponent):Promise<boolean>{

      return new Promise(resolve=>{
        if(this._rs.deactivate&&this._rs.leave_pub()){
          this._ts.modal({content:'确认放弃编辑退出？',btnType:'double'},(result)=>{
            resolve(result);
          });
        }else{
          resolve(true)
        }
      })
  }
}
