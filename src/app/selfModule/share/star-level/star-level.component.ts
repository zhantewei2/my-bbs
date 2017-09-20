import { Component, OnInit,Input} from '@angular/core';

@Component({
  selector: 'star-level',
  templateUrl: './star-level.component.html',
  styleUrls: ['./star-level.component.css'],
  host:{
    'class':'d-block'
  }
})
export class StarLevelComponent implements OnInit {
  level:number;
  floor=(gold:number)=>Math.floor(gold);
  gN:any=(window as any).myRefer.userList['gold'];
  _user:any;
  @Input()disBar:boolean;
  @Input('user')set fn(user:any){
    if(!user)return;
    user.needEp=user.needEp||100;
    this._user=user;
    let val=this.level=user.level;
    this.setStar(val,3,()=>{
      let stars=this.stars,len=this.names.length;
      let str='';
      while(len--){
        let name=this.names[len],
          len2=stars[name];
        while(len2){
          str+=this.getEl(name);
          len2--;
        }
      }
      this.innerhtml=str;
    });
 }
 innerhtml:string;
 getEl(name){
  return `<i class="fa fa-${name}"></i>`
 }
  names:any=['star-o','star-half-o','star'];
  setStar(val,size,cb){
    if(!size)return cb();
    let n=Math.floor(val/size),next=val%size;
    this['stars'][this.names[size-1]]=n;
    this.setStar(next,--size,cb);
  }
  stars={
    star:0,
    'star-half-o':0,
    'star-o':0
  };

  constructor() { }

  ngOnInit() {
  }

}
