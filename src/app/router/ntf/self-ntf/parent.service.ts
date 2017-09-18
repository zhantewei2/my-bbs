import { Injectable } from '@angular/core';
import {DataBaseService} from 'app/service/data-base.service'
@Injectable()
export class ParentService {
  navTo:any;
  model:any;
  constructor(public myDB:DataBaseService){
    myDB.userInit().then(v=>myDB.db2.use('ntfs').then(model=>this.model=model));
  }
}
