import { Pipe, PipeTransform } from '@angular/core';
import {limitStr} from 'app/util/string';
@Pipe({
  name: 'limitStr'
})
export class LimitPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if(!value)return '';
    let str=limitStr(value,args||16);
    if(value!=str)str+='...';
    return str;
  }
}
