import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
export interface Cursor{
  start?:number;
  end?:number;
}

@Injectable()
export class RemindService {
  constructor(
    public router:Router
  ) {
    document.addEventListener('visibilitychange',(e)=>{
      console.log(document.hidden)
    })
  }
  cacheNtfs:any;
  historyPage:number;
  historyCursor:Cursor={};
  activated:boolean;
  navPop=(q)=>this.router.navigate([{outlets:{popup:q}}]);
  toggleNtf=()=>this.activated?this.closeNtf():this.navPop(['ntf']);
  closeNtf(){
    this.navPop(null);
    this.activated=false;
  }
  isInner:boolean=false;
  aInnerNav=(id,now,f)=>{};
}
