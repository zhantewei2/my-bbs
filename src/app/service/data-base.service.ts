import { Injectable} from '@angular/core';
import {IndexDB} from './DB/index';
import {Subject} from 'rxjs/Subject';
import {TotalService} from './total.service';
const dbConfig=(window as any).myCommon.dbConfig;

@Injectable()
export class DataBaseService{
  db:any;
  models:any;
  complate:Subject<any>=new Subject();
  useModel(name){
    return new Promise(resolve=>{
      this.models?resolve(this.models[name]):this.complate.subscribe(()=>resolve(this.models[name]));
    })
  }
  constructor(
    private _ts:TotalService
  ) {
   let db=this.db=new IndexDB(dbConfig.name,dbConfig.opts);
   db.init([
     {name:'draft',opts:{keyPath:'n',type:'capped',limit:5}},
     {name:'main',opts:{keyPath:'type'}},
     {name:'ntfs',opts:{keyPath:'cd',type:'index',index:'cd'}},
     {name:'article',opts:{keyPath:'id'}},
     {name:'vote',opts:{keyPath:'key'}},
     {name:'aIsRead',opts:{keyPath:'aName',type:'capped',limit:1000}},
     {name:'stVote',opts:{keyPath:'key'}}
   ]).then((models:any)=>{
     this.models=models;
     this.complate.next();
   })
  }
}
