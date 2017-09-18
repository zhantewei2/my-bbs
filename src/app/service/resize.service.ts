import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/debounceTime';
@Injectable()
export class ResizeService {
  resizeOb:Observable<number>=Observable.fromEvent(window,'resize').debounceTime(300);
  value:string;
  constructor(){
    this.Extra(window.innerWidth);
    this.resizeOb.subscribe(v=>this.Extra(window.innerWidth));
  }
  Extra(v:number){
    let x;
    if(v>=1200){x='lg'
    }else if(v>=768&&v<1200){x='md'
    }else{x='sm'}
    this.value=x;
  }

}
