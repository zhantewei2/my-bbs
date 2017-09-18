const cappedKey='_ztw_date';

export function filterModel(objectStore,opts){
  let type=opts.type;
  if(!type)return;
  if(type=='capped'&&opts.limit){
      objectStore.createIndex(cappedKey,cappedKey,{unique:true});
  }else if(type=='index'&&opts.index){
    objectStore.createIndex(opts.index,opts.index,{unique:true});
  }
}

export function appendType(model,opts){
  let type=opts.type,
    limit=opts.limit;
  if(!type)return;
  //model.getList(listSize,index,selectField?:Array<field>,cb)
  let method=function(){
    this.getList=(size,select,index=cappedKey,direction='next',query=null)=>{
      return new Promise(resolve=>{
        let results=[];
        model.useCursor({index:index,direction:direction,query:query},(err,cursor)=>{
          if(cursor&&size--){
            if(select&&select.length){
              let obj={};
              select.forEach(v=>{
                obj[v]=cursor.value[v];
              });
              results.push(obj);
            }else{
              results.push(cursor.value);
            }
            cursor.continue();
          }else{
            resolve(results);
          }
        })
      })
    }
  };
  //type=='capped':
  if(type=='capped'){
    let model2:any={};
    model2.__proto__=model;
    model2.cappedLimit=limit;
    //insert~
    model2['insert']=(params,cb)=>{
      params[cappedKey]=new Date().getTime();
      model.size((err,size)=>{
        ((next)=> {
          if (size>=model2.cappedLimit){
            model.useCursor(cappedKey,(err,cursor)=>{
              model.remove(cursor['value'][model.keyPath], (err, data) => {
                next();
              })
            });
          }else{next()}
        })(()=>{
          model.insert(params,cb);
        })
      })
    };
    method.call(model2);
    return model2;
    //~insert
  }else if(type=='index'){
    method.call(model);
    return model;
  }
  return null;
}
