import { Injectable } from '@angular/core';
import {listenOnce} from './node';
import {tooltipPos} from './pos';
import {moveEvent} from './hand';
@Injectable()
export class ToolService {
  constructor() { }
  listenOnce:any=listenOnce;
  tooltipPos=tooltipPos;
  nextTick=(cb)=>setTimeout(()=>{cb()},1);
  ztwMove=moveEvent;
}
