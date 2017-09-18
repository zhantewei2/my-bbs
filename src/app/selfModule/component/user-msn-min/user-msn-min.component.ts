import { Component} from '@angular/core';
import { FormBuilder} from '@angular/forms';
import {toFormGroup,controlData} from 'app/util/FormData';
import {TotalService} from 'app/service/total.service'
import {RouterService} from 'app/service/router.service';
const val=(window as any).myCommon.val;
@Component({
  selector: 'user-msn-min',
  templateUrl: './user-msn-min.component.html',
  styleUrls: ['./user-msn-min.component.css']
})
export class UserMsnMinComponent {
  user: any;
  formGroup:any;
  formData:Array<controlData>=[
    {name:'name',value:'',label:'name',validator:val},
    {name:'pswd',value:'',label:'password',validator:val,type:'password'}
    ];
  constructor(
    private _ts: TotalService,
    private _fb:FormBuilder,
    private _rs:RouterService
  ) {
    this.user = this._ts.userMsn;
    this.formGroup=this._fb.group(toFormGroup(this.formData));
  };

  logout(){
    this._ts.modal(
      {
      content:'退出当前账号？',
      btnType:"double"
      },
      e=>e&&this._ts.logout()
    )
  }
  name:any;
  submit(){
    this._ts.login(this.formGroup.value);
    this.formGroup.reset();
  }
  resetForm(){
    this.formGroup.reset();
    this._ts.err.login=false;
  }

}
