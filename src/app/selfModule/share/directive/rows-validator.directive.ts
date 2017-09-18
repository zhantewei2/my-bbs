import { Directive,Input} from '@angular/core';
import {NG_VALIDATORS,Validator} from '@angular/forms';
import {Limit} from 'app/util/FormData';
@Directive({
  selector: '[minRows]',
  providers:[{provide:NG_VALIDATORS,useExisting:RowsValidatorDirective,multi:true}]
})
export class RowsValidatorDirective implements Validator{
  @Input('minRows')limit=2;
  validate(c){
    let val=c.value;
    if(!val)return null;
    let b=val.match(/(\r|\n)/g);
    if(!b)return null;
    return b.length>this.limit?{'overRows':true}:null;
  }
}


// <input [limitLen]='[1,12]'>
@Directive({
  selector:'[limitLen]',
  providers:[{provide:NG_VALIDATORS,useExisting:LimitLenDirective,multi:true}]
})
export class LimitLenDirective implements Validator{
  @Input('limitLen')set l(val:Array<any>){
    this.limit=Limit(val[0],val[1]);
  };
  limit:any;
  validate(c){
    return this.limit(c.value);
  }
}
