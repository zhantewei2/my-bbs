import { Pipe, PipeTransform } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
@Pipe({
  name: 'trustHtml'
})
export class TrustHtmlPipe implements PipeTransform {
  transform(value: any): any {
    return this._st.bypassSecurityTrustHtml(value);
  }
  constructor(private _st:DomSanitizer){}

}
