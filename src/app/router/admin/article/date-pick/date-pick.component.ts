import { Component, OnInit} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {DateObj} from './DateObj';

@Component({
  selector: 'ztw-date-pick',
  templateUrl: './date-pick.component.html',
  styleUrls: ['./date-pick.component.css'],
  providers:[
    {
      provide:NG_VALUE_ACCESSOR,
      useExisting:DatePickComponent,
      multi:true
    }
  ]
})
export class DatePickComponent implements OnInit {
  originDate:any;
  changeFn:any=()=>{};
  dateObj:DateObj;
  registerOnTouched(){}
  registerOnChange(fn){this.changeFn=fn;}
  writeValue(val:any){
    console.log(val)
    if(!val)return;
    try{
      this.originDate=this.originDate||val;
      this.dateObj=new DateObj(val);
    }catch(e){console.log(e)}
  }
  result:Date;
  constructor(){}
  ngOnInit() {
  }
  add(i){
    let obj=this.dateObj;
    if(obj[i]<obj['max'][i]||!obj['max'][i])obj[i]++;
  }
  reduce(i){
    this.dateObj[i]>1&&this.dateObj[i]--
  }
  changeDate=()=>{
    this.result=this.dateObj.getDate();
    this.changeFn(this.result);
  };
  resetDate(){
    this.dateObj=new DateObj(this.originDate);
    this.result=null;
    this.changeFn(this.originDate);
  }
}
