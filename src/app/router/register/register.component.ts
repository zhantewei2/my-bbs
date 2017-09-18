import { Component, OnInit,ViewChild } from '@angular/core';
import {Router} from '@angular/router';
import { HttpService} from '../../service/http.service';
import {TotalService} from '../../service/total.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @ViewChild('form')form;
  running:boolean=false;
  acceptMsn:string='none';
  footerModel:string='single';
  @ViewChild('modal')modal;
  register(msn){
    if(!msn)return;
    this.running=true;
    this.http.postWithVf('/user/register',msn).then(v=>{
      this.running=false;
      this.form.reset();
      let model='single';
      if(!v||!v.data){
          this.acceptMsn='service error';
        }else if (v.data==1){
          this.acceptMsn='注册成功! 现在为你返回之前的页面!';
          model='double';
        }else{
          let d=v.data;
          if(d.length>1){
            this.acceptMsn='账号和昵称都已存在';
          }else if(d[0]._id==msn.name){
            this.acceptMsn='账号已存在';
          }else{
            this.acceptMsn='昵称已存在';
          }
      }
      this.footerModel=model;
      this.modal.open();
    })
  }
  constructor(
    private http:HttpService,
    private _ts:TotalService,
    private router:Router
  ) { }
  ngOnInit() {

  }
  redirect(){
    this.router.navigate([this._ts.preUrl]);
  }
}
