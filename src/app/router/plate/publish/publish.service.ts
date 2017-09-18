import { Injectable } from '@angular/core';
export interface UseLimit{
  pay?:number;
  rView?:any;
  vote?:any;
}

@Injectable()
export class PublishService {
  modal:any;
  textEditor:any;

  constructor() { }
  _selectItem:string;
  selectName:String;
  set selectItem(val){
    this._selectItem=val;
    this.selectName=val=='pay'?'支付经验'+this.useLimit.pay:(val=='rView'?'回复可见':(val=='vote'?'投票':null));
  }
  get selectItem(){return this._selectItem}
  useLimit:UseLimit={};
  setLimit=(obj)=>{
    let keys=Object.keys(obj);
    this.selectItem=keys[0];
    Object.assign(this.useLimit,obj);
  };
  clearLimit=(key)=>{
    if(this.selectItem==key)this.selectItem=null;
    this.useLimit[key]=null;
  }
}
