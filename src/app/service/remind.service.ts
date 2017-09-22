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
    const body=document.querySelector('body');
    let result:boolean;
    body.style.transition='0.5s ease background';
    document.addEventListener('visibilitychange',()=>{
      result=document.hidden;
      if(result===undefined)return;
      if(result){
        console.log(result);
        body.style.background='gray';
      }else{
        body.style.background=null;
      }
    })
  }
  cacheNtfs:any;
  historyPage:number;
  historyCursor:Cursor={};
  activated:boolean;
  navPop=(q)=>this.router.navigate([{outlets:{popup:q}}],{skipLocationChange:true});
  toggleNtf=()=>this.activated?this.closeNtf():this.navPop(['ntf']);
  closeNtf(){
    this.navPop(null);
    this.activated=false;
  }
  isInner:boolean=false;
  aInnerNav=(id,now,f)=>{};
}
