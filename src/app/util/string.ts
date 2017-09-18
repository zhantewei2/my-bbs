export function limitStr(val,size){
  //cn size/4;
  //en size/2
  let len=0,str='';
  for(let i of val) {
    len += i.codePointAt(0).toString(16).length;
    if (len>size)break;
    str += i;
  }
  return str;
}
