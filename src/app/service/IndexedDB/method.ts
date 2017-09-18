import {toCB,asyncForEach} from './util';


export function dbMethod(db,modelName,keyPath){
  let tryToCB=function(...args){
    try{
      toCB.apply(null,args);
    }catch(err){
      let objectStore=db.transaction(modelName,'readwrite').objectStore(modelName);
      toCB.apply(null,[objectStore].concat(args.slice(1)));
    }

  };
  this.removeAll=(cb)=>tryToCB(this,'clear',null,cb);

  this.size=(cb)=>tryToCB(this,'count',null,cb);

  this.insert=(params,cb)=>tryToCB(this,'add',params,cb);

  this.remove=(key,cb)=>tryToCB(this,'delete',key,cb);

  this.findOne=(key,cb)=>tryToCB(this,'get',key,cb);

  this.upsert=(key,params,cb)=>{
    this.findOne(key,(err,data)=>{
      if(!data)data={};
      params[keyPath]=key;
      Object.assign(data,params);
      tryToCB(this,'put',data,cb);
    })
  };
  this.purePut=(params,cb)=>{
    tryToCB(this,'put',params,cb);
  };
  this.useCursor=(opts,cb)=>{
    /* opts:{index: query: direction: }*/
    let method=(model)=>{
      let cursorI=model.index(opts.index);

      let req=cursorI.openCursor(opts.query,opts.direction);
        req.onsuccess=(e)=>cb(null,e.target.result);
    };
    try{
      method(this)
    }catch(e){
      let objStore=db.transaction(modelName,'readwrite').objectStore(modelName);
      method(objStore);
    }
  };
  this.findMany=(keys:Array<string>,cb)=>{
    let results=[];
    asyncForEach(
      keys,
      (val,next)=>{
        this.findOne(val,(err,data)=>{
          if(err){
            cb(err,null);
            next('out');
          }
          results.push(data);
          next();
        })
      },
      ()=>{
        cb(null,results);
      }
    );
  };
  this.genKey=(obj)=>{
    let key='';
    for(let i in obj){
      key+=i+'_'+obj[i]+',';
    }
    return key.slice(0,-1);
  }

}
