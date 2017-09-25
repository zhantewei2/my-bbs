import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/debounceTime';
@Injectable()
export class ResizeService {
  resizeOb:Observable<number>=Observable.fromEvent(window,'resize').debounceTime(300);
  resizeVal:Observable<string>;
  value:string;
  constructor(){
    this.value=this.Extra(window.innerWidth);
    this.resizeVal=this.resizeOb.map(v=>this.Extra(window.innerWidth));
    this.resizeVal.subscribe(v=>this.value=v);
  }
  Extra(v:number){
    return v>1200?'lg':(v>=768&&v<1200?'md':'sm');
  }

}
