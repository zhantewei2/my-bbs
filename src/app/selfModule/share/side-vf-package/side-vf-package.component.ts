import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
const hostUrl=(window as any).myCommon.hostUrl;
@Component({
  selector: 'ztw-side-vf-package',
  templateUrl: './side-vf-package.component.html',
  styleUrls: ['./side-vf-package.component.css']
})
export class SideVfPackageComponent implements OnInit {
  imgUrl:any;
  showAlert:boolean=false;
  showVf:boolean=false;
  passVf:boolean=false;
  @Input('height')height:any;
  @Input('width')width:any='100%';
  @Input('alert')alert=true;
  @Output('pass')passEmt:EventEmitter<boolean>=new EventEmitter();
  @Input('bindValid')set fn(valid){
    if(!valid ||this.showVf ||this.passVf)return;
    this.imgUrl=hostUrl+'/static/vf/'+Math.floor(Math.random()*10)+'.jpg';
    this.showVf=true;
  }
  constructor() { }
  ngOnInit() {};
  pass(e){

    this.passEmt.emit(e);
    if(!e)return;
    this.passVf=true;
    this.showVf=false;
    this.showAlert=true;
  }
  reset(){
    this.passVf=false;
    this.showVf=false;
    this.showAlert=false;
    this.passEmt.emit(false);
  }
}
