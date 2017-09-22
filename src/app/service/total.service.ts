import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import '../util/array';
import {Router,NavigationStart} from '@angular/router';
import {Subject} from 'rxjs/Subject';
import * as config from '../util/common';
(window as any).myCommon=config;
import * as obj from '../util/Object';
(window as any).myObj=obj;
import * as refer from '../msn/referList';
(window as any).myRefer=refer;
import {Observable} from 'rxjs/Observable';

export interface user{
  name?:string;
  email?:string;
  nickN?:string;
  level?:number;
  ep?:number;
  needEp?:number;
  gold?:number;
  head?:string;
  ntfSelf?:number;
  insert?:boolean;
  type?:string;
}
@Injectable()
export class TotalService{
    cgs:any;
    homeUrl='/router/home';
    preUrl:any;
    nowUrl:any;
    loginSub:Subject<boolean>=new Subject();
    initSub:Subject<boolean>=new Subject();
    getCgs=()=>{
      return new Promise(resolve=>{
        if(this.cgs)return resolve(this.cgs);
        this.initSub.subscribe(v=>resolve(this.cgs));
      })
    };
    url:any={
      login:'/user/login',
      logout:'/user/logout',
      register:'/user/register',
      upHeader:'/user/manage/upHeader',
      selHeader:'/user/manage/selHeader',
      cgMsn:'/user/manage/cgMsn',
      publish:'/user/manage/publish',
      plates:'/router/plates'
    };
    //loading:
    loading:any={
      login:false,
      changeHead:false
    };
    err:any={
      login:false
    };
    initHome=()=>{
      return this.http.get(this.homeUrl).then((data:any)=>{
        if(!data)return;
        this.cgs=data;
        this.initSub.next(true);
        return true;
      });
    };
    defineUser=(msn)=>{
      let headStore;
      Object.defineProperties(msn,{
        head:{
          enumerable:true,
          set:(val)=>headStore=val,
          get:()=>this.hostUrl+'/static/header/'+headStore
        }
      });
      return msn;
    };
    hostUrl=config.hostUrl;
    constructor(
      public http:HttpService,
      private router:Router
    ){
        this.defineUser(this.userMsn);
        this.initHome();
        this.http.post('/user/login').then((data:any)=>{
          if(!data){
            this.loginSub.next(false);
            return this.userMsn.name=null;
          }
          this.initUser(data);
        });

      //routerUrl:
      router.events.subscribe(v=>{
        if(v instanceof NavigationStart){
          this.preUrl=this.nowUrl;
          this.nowUrl=v.url;
        }
      })


    }
    userMsn:user={};
    login(userPost){
      //userMsn:{name: ,pswd: ,vf:};
      this.loading.login=true;
      this.http.postWithVf(this.url.login,userPost).then(v=>{
        this.loading.login=false;
        if(v)return this.initUser(v);
        this.err.login=true;
        this.userMsn.name=null;
        this.loginSub.next(false);
      });
    }
    isLogined(){
      return new Promise((resolve:any)=>{
        if(this.userMsn.name!==undefined)return resolve(this.userMsn.name);
          let suber=this.loginSub.subscribe(v=>{
            suber.unsubscribe();
            resolve(v);
          });

      })
    }
    whenLogined(){
      const ob=Observable.of(this.userMsn.name);
      return Observable.merge(ob,this.loginSub);
    }
    initUser(v){
      let user:any=this.userMsn;
      Object.assign(user,refer.transactionUser(v));
      this.loginSub.next(user.name);
    }
    logout(){
      this.http.post(this.url.logout).then(v=>{
        if(!v)return;
        this.router.navigate(['/']);
        obj.clean(this.userMsn);
        this.loginSub.next(false);
      })
    }
    minModal:any;
    throwErr=(val)=>this.minModal=val;
    alert:any=()=>{};
    modal:any=()=>{};
    closeModal:any=()=>{};
}
