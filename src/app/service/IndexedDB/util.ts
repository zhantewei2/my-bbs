export function toCB(colle,method,val,cb){
  let req=colle[method].call(colle,val);
  req.onsuccess=(e)=>{cb(null,e.target.result)};
  req.onerror=(e)=>{cb(e.target.result,null)};
};
export function asyncForEach(arr,every,end){
  arr.length?every(arr[0],(out)=>{if(!out)asyncForEach(arr.slice(1),every,end)}):end();
}
