import { Component, OnInit,forwardRef} from '@angular/core';
import{NG_VALUE_ACCESSOR} from '@angular/forms';
import {slideRightToggle} from '../../animations/animate';
@Component({
  selector: 'ztw-min-modal',
  templateUrl: './min-modal.component.html',
  styleUrls: ['./min-modal.component.css'],
  animations:[slideRightToggle('.3s ease-out',{transform:'translateX(-100%)',opacity:0})],
  providers:[
    { provide:NG_VALUE_ACCESSOR,
      useExisting:forwardRef(()=>MinModalComponent),
      multi:true
    }
  ]
})
export class MinModalComponent implements OnInit {
  _value:any;
  bgShow:boolean;
  modalShow:boolean;
  isClose:boolean;
  constructor() { }
  ngOnInit() {}
  open(){
    this.isClose=false;
    this.bgShow=true;
    setTimeout(()=>{this.modalShow=true;},1);
    let event=()=>{
      this.close();
      document.removeEventListener('click',event);
    };
    setTimeout(()=>{
      document.addEventListener('click',event);
    },1);
  }
  close(){
    this.modalShow=false;
    this.isClose=true;
    this.changeFn(null);
  }
  changeFn:any=()=>{};
  registerOnTouched(){}
  registerOnChange(fn:any){
    this.changeFn=fn;
  }
  writeValue(value:any){
    if(!value)return;
    this._value=value;
    this.open();
  }
}
