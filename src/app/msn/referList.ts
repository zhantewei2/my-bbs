import {epArr} from '../util/common';
export const userList={
  name:'账号',
  email:'邮箱',
  level:'等级',
  nfs:'通知',
  nickN:'昵称',
  ntfn:'新消息',
  ntfs:'历史消息数',
  gold:'论坛币'
};
export const cvUserList={
  nickN:'info.nickN',
  name:'_id',
  email:'info.email',
  pswd:'info.pswd',
  ep:'ep.now',
  gold:'ep.g'
};
export function userToServer(data){
  let obj={},name2;
  for(let i in data){
    name2=cvUserList[i];
    name2?obj[name2]=data[i]:obj[i]=data[i];
  }
  return obj;
}
export function transactionUser(v){
  return {
    name:v._id||v.id,
    nickN:v.info?v.info.nickN:null,
    email:v.info?v.info.email:null,
    level:v.level,
    ntfSelf:v.ntf?v.ntf.self:null,
    head:v.head?v.head.name:null,
    ep:v.ep?v.ep.now:null,
    needEp:v.level?epArr[v.level-1]:null,
    type:v.type||null,
    gold:v.ep?v.ep.g:null,
    st:v.st||null
  }
}
export function convertToCn(dataArr,referList=userList){
  dataArr.forEach(v=>v.name2=userList[v.name]||null);
}
let getKey=(obj,val)=>{
  for(let i in obj){
    if(obj[i]==val){
      return i;
    }
  }
  return null;
};
