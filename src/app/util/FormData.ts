import {Validators,AbstractControl} from '@angular/forms';

export function Limit(start,end){
  start*=4;
  end*=4;
  return function(val) {
    const err={'limitMistake':true};
    if(!val)return err;
    let len = 0, pass = true;
    for (let i of val) {
      len += i.codePointAt(0).toString(16).length;
      if (len > end) {
        pass = false;
        break;
      }
    }
    if (pass && len < start) pass = false;
    return pass ? null : err;
  }
}

export class controlData{
  name:any;
  value:any;
  label?:any;
  placeholder?:any;
  validator?:Array<any>;
  control?:any;
  type?:any;
  disabled?:boolean;
}

export function limitValidator(start:number,end:number) {
  //limit start< <end
  const limit=Limit(start,end);
  return (control:AbstractControl)=>{
    return limit(control.value);
  }
}
/*


formData:[{validator:['required','minLength(2)']}]

*/
export function toFormGroup(formDatas){
  let forms={},valArr,control;
  formDatas.forEach((v:controlData)=>{
    valArr=[];
    control={};
    if(v.validator){
      v.validator.forEach(i=>{
        if(typeof i =='string'){
          let param=i.match(/\(.*?\)/);
          if(param){
            let param1=i.slice(0,param.index),
            param2=i.slice(param.index+1,i.length-1);
            valArr.push(Validators[param1](param2));
          }else{
           valArr.push(Validators[i]);
          }
        }else{
          valArr.push(i);
        }
      })
    }
    forms[v.name]=[v.disabled?{value:v.value,disabled:true}:v.value,valArr];
  });
  return forms;
}
export function addControl(formGroup,formDatas){
  let controls=formGroup.controls;
  Object.getOwnPropertyNames(controls).forEach(name=>{
    let controlData=formDatas.find(v=>v.name==name);
    controlData['control']=controls[name];
  });
  return formDatas;
}
