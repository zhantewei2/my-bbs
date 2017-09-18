import { Injectable } from '@angular/core';
import {TotalService} from 'app/service/total.service';
import {ActivatedRouteSnapshot,RouterStateSnapshot} from '@angular/router';

@Injectable()
export class GetCgRgResolve {
  constructor(private _ts:TotalService) { }
  resolve(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):Promise<any>{
    return new Promise(resolve=>{
      this._ts.getCgs().then(cgs=>{
        let params:any=route.params,
          arr=params.id.split('_'),
          cg=arr[0],
          rg=arr[1],
          obj={
            cgId:cg,
            rgId:rg,
            cgName:cg?cgs[cg].name:null,
            rgName:cgs[cg]['rgs'][rg].name,
            fragment:route.fragment
          };
        Object.assign(obj,params);
        Object.assign(obj,route.queryParams);
        resolve(obj);
      })
    })
  }
}
