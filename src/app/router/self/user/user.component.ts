import { Component, OnInit} from '@angular/core';
import { TotalService} from 'app/service/total.service';
import { FormBuilder} from '@angular/forms';
import {toFormGroup,limitValidator} from 'app/util/FormData';
import {slideRightToggle} from 'app/selfModule/animations/animate';
import 'rxjs/add/operator/debounceTime';
import {ActivatedRoute} from '@angular/router';
import {RouterService} from 'app/service/router.service';
import {UserMsnService} from '../user-msn.service';
const refer=(window as any).myRefer;
const toArray=(window as any).myObj.toArray;
@Component({
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  animations:[slideRightToggle()],
  providers:[UserMsnService]
})
export class UserComponent implements OnInit {
  userMsnUrl:string='/um/msn';
  userArr:any;
  user:any;
  edit:boolean=false;
  formGroup:any;
  oldData:any;
  msnChange:boolean=false;
  msnUping:boolean=false;
  isMaster:boolean;
  constructor(
    public _ts:TotalService,
    private _fb:FormBuilder,
    private route:ActivatedRoute,
    public _rs:RouterService
  ) {}
  init(user,isMaster:boolean=false){
    this.isMaster=isMaster;
    this.user=user;
    let userArr=toArray(user);
    refer.convertToCn(userArr);
    this.userArr=userArr.filter(v=>v.name2);
    if(isMaster){
      this.canEdit(userArr,['nickN','email']);
      let formData=[
        {name:'nickN',value:user.nickN,validator:['required',limitValidator(2,7)]},
        {name:'email',value:user.email,validator:['email','required','maxLength(30)']}
      ];
      this.oldData={nickN:user.nickN,email:user.email};
      this.formGroup=this._fb.group(toFormGroup(formData));
      this.formGroup.valueChanges.debounceTime(200).subscribe(v=>{
        let change=false;
        for(let i in v){
          if(v[i]!=user[i]){
            change=true;
            break;
          }
        }
        this.msnChange=change;
      });
    }
    this.initEnd=true;
  }
  initEnd:boolean=false;
  ngOnInit() {
    const query:any=this.route.snapshot.queryParams,
      name=query.name?decodeURIComponent(query.name):null;
    this._ts.isLogined().then(userName=>{
      if(!userName){
        this._rs.back();
      }else if((!name&&userName)||(name&&name==userName)){
        this.getMsn(this._ts.userMsn.name,true).then((v:any)=>this.init(Object.assign(this._ts.userMsn,{email:v.info.email,st:v.st}),true));
      }else if(name&&name!=userName){
        this.getMsn(name).then((v:any)=>{
          v._id=name;
          this.init(Object.assign(this._ts.defineUser({}),refer.transactionUser(v)))
        })
      }
    });
  }
  getMsn=(userName,isMaster?)=>this._ts.http.get(this.userMsnUrl,isMaster?{i:userName,p:1}:{i:userName});
  modalContent:any;
  canEdit(dataArr,EditNames){
    dataArr.forEach(v=>{
      if(EditNames.indexOf(v.name)>=0){
        v.edit=true;
        v.editEvent=false;
        v.editEvent2=false;
      }
    })
  }
  cancelEdit=false;
  mdConfirm:any=()=>{};
  leaveItem(i){
    i.editEvent2=false;
    this.cancelEdit=false;
  }
  clickItem(e,i){
    e.stopPropagation();
    this.cancelEdit=true;
    i.editEvent2=true;
  }

  resetMsn(){
    this.formGroup.reset(this.oldData);
  }
  sendMsn(data){
    this.msnUping=true;
    let sendData=refer.userToServer(data);
    this._ts.http.post(this._ts.url.cgMsn,sendData).then(v=>{
      this.msnUping=false;
      console.log('change',v);
      if(!v)return;
      for(let i in data){
        this._ts.userMsn[i]=data[i];
      }
      this.init(this._ts.userMsn,true);
      this._ts.alert('修改成功！');
    })
  }
  submitChange(){
    let result=this.formGroup['_value'],msn='';
    for(let i in result){
      if(result[i]==this.user[i]){
        delete result[i];
      }else{
        msn+=`<p>你的<b class="mx-1">${refer.userList[i]}</b>将由<code>${this.oldData[i]}</code>修改为:<code>${result[i]}</code></p>`
      }
    }
    msn+=`<small class="text-muted">点击确认提交修改</small>`;
    this._ts.modal(
      {content:msn,btnType:'double',type:'info'},
      e=>e&&this.sendMsn(result)
    )
  }

}
