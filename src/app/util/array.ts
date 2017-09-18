(Array.prototype as any).allFind=function(fn){
  let results=[];
  this.forEach(v=>{
    if(fn(v))results.push(v);
  });
  return results;
};
(Array.prototype as any).reverse=function(){
  let arr2=[],len=this.length;
  while(len--){
    arr2.push(this[len]);
  }
  return arr2;
};
(Array.prototype as any).asyncForEach=function(fn,endFn){
  this.length?fn(this[0],()=>this.slice(1).asyncForEach(fn,endFn)):endFn();
};
