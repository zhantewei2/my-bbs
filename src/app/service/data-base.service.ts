import { Injectable} from '@angular/core';
import {IndexDB} from './DB/index';
import {Subject} from 'rxjs/Subject';
import {TotalService} from './total.service';
const dbConfig=(window as any).myCommon.dbConfig;



@Injectable()
export class DataBaseService{
  draftModel:any;
  db:any;
  initComplete:boolean=false;
  subDB:Subject<any>=new Subject();
  subDB0:Subject<any>=new Subject();
  names:any;
  db2:any={
    store:{},
    append:(name,opts,user=false)=>{
      let n=this.db2.store[name]={};
      n['opts']=opts;
      n['user']=user;
    },
    use:(name)=>{
      let n=this.db2.store[this.names[name]];
      return this.db.use(this.names[name],n.opts,n.user);
    }
  };
  _isInit:boolean=false;
  _userInit:any=false;
  isInit=()=>new Promise(resolve=>this._isInit?resolve():this.subDB0.subscribe(()=>resolve()));
  userInit=()=>new Promise(resolve=>this._userInit?resolve():this.subDB.subscribe(()=>resolve()));
  constructor(
    private _ts:TotalService
  ) {
   let db=this.db=new IndexDB(dbConfig.name,dbConfig.opts);
   db.init().then(()=>{
     this._isInit=true;
     this.subDB0.next(true);
     this._ts.whenLogined().subscribe(v=>{
       if(v){
         let name;
         name=this._ts.userMsn.name;
         let names={
           draft:name+'-draft',
           main:name+'-main',
           ntfs:name+'-ntfs'
         };
         this.names=names;
         this.db2.append(names.main,{keyPath:'type'});
         /*
          main:{
          type:'draft',c:content ,t:title, d:date ,s:start
          type:'main'
          }
          */
         this.db2.append(names.draft,{keyPath:'n',type:'capped',limit:5});
         this.db2.append(names.ntfs,{keyPath:'cd',type:'index',index:'cd'});
       }
       /*
        n:name,c:content,t:title,s:start.
        */
       this.initComplete=true;
       this._userInit=true;
       this.subDB.next(true);
     })
   })
  }
  getDB(){
    return new Promise(resolve=>{
      if(this.initComplete)return resolve(this.db2);
      this.subDB.subscribe(()=>{resolve(this.db2)});
    })
  }

}
