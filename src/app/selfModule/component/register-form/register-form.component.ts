import { Component, EventEmitter,OnInit,Output} from '@angular/core';
import {controlData,toFormGroup,addControl} from '../../../util/FormData';
import {FormBuilder} from '@angular/forms';
@Component({
  selector: 'register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {
  constructor(private _fb:FormBuilder) { }
  formGroup:any;
  equal:boolean;
  pswd1:any;
  pswd2:any;
  passVf:boolean;
  @Output('register')register:EventEmitter<any>=new EventEmitter();
  ngOnInit() {
    this.formGroup=this._fb.group(toFormGroup(this.formDatas));
    this.formDatas=addControl(this.formGroup,this.formDatas);
    let pswd1=this.pswd1=this.formGroup.get('pswd'),
      pswd2=this.pswd2=this.formGroup.get('pswd2');
    this.formGroup.valueChanges.subscribe(v=>{
      if(pswd1.valid&&pswd2.valid&&pswd1.value==pswd2.value){
        this.equal=true;
      }else{
        this.equal=false;
      }
    })
  }
  publicVal:any=['required','minLength(4)','maxLength(16)'];
  formDatas:Array<any>=[
    {name:'name',label:'<i class="fa fa-user-o mr-1"></i>账号',value:'',validator:this.publicVal},
    {name:'nickN',label:'昵称',value:'',validator:this.publicVal},
    {name:'pswd',label:'密码',value:'',validator:this.publicVal,type:'password'},
    {name:'pswd2',label:'重复密码',value:'',validator:this.publicVal,type:'password'},
    {name:'email',label:'<i class="fa fa-envelope-o mr-1"></i>email</a>',value:'',validator:['required','email'],type:'email'}
  ];
  reset(){
    this.formGroup.reset();
  }
}
