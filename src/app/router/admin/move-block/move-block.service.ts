import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';
@Injectable()
export class MoveBlockService {
  constructor() { };

  selectedIndex:number;
  controls:any;
  floatSubject:Subject<number>=new Subject();
  getAbsoluteTop(node){
    let top=node.offsetTop;
    if(node.offsetParent) top+=this.getAbsoluteTop(node.offsetParent);
    return top;
  }
  getRectLeft(node){
    return node.getBoundingClientRect().left;
  }
  moving:boolean=false;
}
export class ztwDragParent{
  duration:number;
  dataArr:any;
  dragIndex:any;
  disabled:boolean;
  dragOnce:any;
}