import { Component,Input} from '@angular/core';

@Component({
  selector: 'ztw-progress-bar',
  template:`
    <div class="progress">
      <div [ngClass]="_type" class="progress-bar" [style.width.%]="percent">
        <span class="showValue">{{showValue?this.value:''}}</span>
      </div>
    </div>
  `,
  styleUrls: ['./ztw-progress-bar.component.css']
})
export class ZtwProgressBarComponent{
  _type:any={};
  percent:number;
  @Input()set type(val){
    this._type={};
    if(val)this._type['bg-'+val]=true;
  }
  @Input()max=100;
  @Input()value;
  @Input()showValue:any;
  constructor() { }
  ngOnChanges(){
    const max=this.max,val=this.value;
    if(max!==undefined&&val!==undefined){
      this.percent=(val/max)*100;
    }
  }


}
