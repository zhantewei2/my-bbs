import { Component, OnInit,forwardRef,Input} from '@angular/core';
import { NG_VALUE_ACCESSOR} from '@angular/forms';
import {TotalService} from '../../../service/total.service';
import {HttpService} from '../../../service/http.service';

@Component({
  selector: 'select-img',
  templateUrl: './select-img.component.html',
  styleUrls: ['./select-img.component.css'],
  providers:[
    {
      provide:NG_VALUE_ACCESSOR,
      useExisting:forwardRef(()=>SelectImgComponent),
      multi:true
    }
  ]
})
export class SelectImgComponent implements OnInit {
  img:any=true;
  buffer:any;
  sysName:string;
  oldName:string;
  @Input('upImg')upload;
  constructor(
    private _ts:TotalService,
    private http:HttpService
  ){ }
  changeFn:any=()=>{};
  registerOnChange(fn:any){
    this.changeFn=fn;
  }
  registerOnTouched(fn:any){}
  writeValue(value){
    //value= {data: , buffer: } | system imgName;
    this.img=value;
    if(!value)return;
    if(this.upload){
      this.buffer=value.buffer;
      this.user2.head=value.data;
    }else{
      this.sysName=value;
      this.user2.head=(window as any).myCommon.putImg(value);
    }
  }
  back(){
    this.img=null;
    this.buffer=null;
    this.changeFn(null);
  }
  user2:any;

  ngOnInit(){
    this.user2=Object.assign({},this._ts.userMsn);
    this.oldName=this._ts.userMsn.head.match(/[^\/]+$/).toString();
  }
  confirm(){
    let load=this._ts.loading,
      dealEnd=(v)=>{
        load.changeHead=false;
        if(!v)return;
        this._ts.userMsn.head=v;
        this._ts.closeModal();
      };
    load.changeHead=true;
    this.upload?
      this.http.postUp(this._ts.url.upHeader,this.buffer).subscribe(dealEnd):
      this.http.post(this._ts.url.selHeader,{name:this.sysName}).then(dealEnd);
  }
}
