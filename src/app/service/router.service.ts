import { Injectable} from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import {TotalService} from './total.service';
@Injectable()
export class RouterService {
  rgName=(cgId,rgId)=>cgId+'_'+rgId;
  navPlate(cgId,rgId){
    let str=this.rgName(cgId,rgId);
    this.router.navigate(['/plates',str]);
  }
  constructor(
    private router:Router,
    private _ts:TotalService,
    private route:ActivatedRoute
  ) {}
  openLogin:any=()=>{};
  navInsertComp=()=>{};
  selectRgVersion:number;
  selectRgVersion2:number;
  nav:any={
    height:null,
    hiddenTop:500,
    node:null,
    sideNav:null,
    close:null,
  };
  hasLogined(cb){
    this._ts.isLogined().then(v=>{
      !v?this.openLogin():cb();
    })
  }
  back=()=>!this._ts.preUrl?this.goPreLevel():window.history.back();
  navToUser(uId){
    if(!this._ts.userMsn.name)return this._ts.alert('登录后才能查看');
    this.router.navigate(['/user'],{queryParams:{name:encodeURIComponent(uId)}});
  }
  navToArticle(cg,rg,id){
    this.router.navigate(['/plates',this.rgName(cg,rg),id]);
  }
  navToPublish(cg,rg,transmit?){
    if(transmit)this.transmit=transmit;
   this.router.navigate(['plates',this.rgName(cg,rg),'publish'])

  }
  transmit:any;
  isHome:boolean;
  goPreLevel(){
    let url=this.router.url,
    segments=url.split('/'),
    preSegment=segments[segments.length-2],
    navUrl;
    if(preSegment===undefined)return false;
    if(preSegment=='plates'){
      navUrl='/';
    }else{
      segments.pop();
      navUrl=segments.join('/');
    }
    this.router.navigate([navUrl]);
  }
  //other lazyload module addon msn in here;
  addon:any={};
  cache:any={};
  cacheBrief:any={};
}
