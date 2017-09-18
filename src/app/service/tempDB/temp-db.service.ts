import { Injectable } from '@angular/core';
import {baseDB,baseOpts,forwardPageDB} from './tempDB';
const Opts:baseOpts={
  size:100,
  batch:10
};
@Injectable()
export class TempDBService {
  /*
    _tempDB.use(modelName).insert(key:any,value:any); the key could be any;
                          .find(key:any);

   */
  forwardPageDB:any=forwardPageDB;
  db:any={};
  use(modelName,opts:any=Opts){
    let db=this.db;
    if(!db[modelName])db[modelName]=new baseDB(opts);
    return db[modelName];
  }
  constructor(){

  }

}
