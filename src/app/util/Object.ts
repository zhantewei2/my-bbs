export function clean(obj){
  for(let i in obj){
    obj[i]=null;
  }
}
export function selectParams(obj,arr){
  let obj2={};
  arr.forEach(v=>obj2[v]=obj[v]);
  return obj2;
}
export function toArray(obj){
  let arr=[];
  for(let i in obj){
    arr.push({name:i,value:obj[i]});
  };
  return arr;
}
export function addStyle(node,obj) {
  for(let i in obj){
    node.style[i]=obj[i];
  }
}
export class setOnce{
  old:any=null;
  once(element,val){
    if(val!==this.old)element.style.top=this.old=val;
  }
  constructor(){}
}
export function isNumber(str){
  if(typeof str=='number')return true;
  try{
    return !str.match(/[^\d]+/g)
  }catch(e){}
}
