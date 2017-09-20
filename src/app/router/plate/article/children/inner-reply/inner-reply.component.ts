import { Component, OnInit,ViewChild} from '@angular/core';
import {FormControl,Validators} from '@angular/forms';
import {fade,slideXToggle,fadeToggle} from 'app/selfModule/animations/animate';
import {lzwService} from 'app/service/util.service';
import {limitStr} from 'app/util/string';
const selectParams=(window as any).myObj.selectParams;
export interface Query{
  rgId:number;
  aId:string; //plateId
  rId:number; //replyId;
  auId:string;
  auName:string; //author nickName;
  c:string;
  r2?:boolean;
  tId?:string; //toId
  ab?:string;
}


@Component({
  selector: 'app-inner-reply',
  templateUrl: './inner-reply.component.html',
  styleUrls: ['./inner-reply.component.css'],
  animations:[fade(),slideXToggle(),fadeToggle()],

})
export class InnerReplyComponent implements OnInit {
  constructor(private _lzw:lzwService){}
  show:boolean=true;
  loading:boolean=false;
  error:string;
  upUrl:string='/user/manage/reply';
  nextVf:boolean=false;
  errMsn={
    'required':'需要内容',
    'overRows':'超过最大行数'
  };
  as:any;
  @ViewChild('txt')txt;
  btn2='btn btn-primary btn-sm';
  btn1=this.btn2+' mr-2';
  otherAu:any;
  parent:any;
  ngOnInit() {
    setTimeout(()=>{
      let txt=this.txt;
      txt.valueChanges.subscribe(v=>{
        if(txt.valid)return this.error=null;
        let err=txt.errors;
        if(err){
          this.error=null;
          let str='';
          for(let i in err){
            str+=this.errMsn[i];
          }
          this.error=str;
        }
      });
    },1);
  }
  submitC(){
    this.as._rs.hasLogined(()=>this.nextVf=true);
  }
  otherRpPrefix(name){
    return `<small><em>回复 </em><b>${name}: </b></small>`;
  }
  close(){}
  formControl:FormControl=new FormControl('',Validators.required);
  anDone(){
   if(!this.show)this.close();
  }
  close1(){this.show=false;}
  _submit(){
    let as=this.as;
    this.loading=true;
    let baseQuery=as.getParams('cgId','rgId','aId','auId','auName');
    let tId,c=this.txt.value,otherAu=this.otherAu;
    if(otherAu){
      tId=otherAu.id;
      c=this.otherRpPrefix(otherAu.name)+c;
    }else{
      tId=this.parent.user.name;

    }
    let query:Query=Object.assign(baseQuery,{
      rId:this.parent.i.rId,
      c:this._lzw.encode(c),
      r2:true,
      tId:tId,
      ab:limitStr(as.title,32)
    });
    as._us.post(as.url.reply,query,'reply2').then(v=>{
      if(!v)return as.throwErr('网络错误');
      this.loading=false;
      this.close();
      let data:any=selectParams(query,['auId','auName','c']);
      data.cd=Date();
      this.parent.newReply=data;
    })

  }
}
