export class articleData{
  id:string=null;
  __v:number=null;
  lrd:string=null;
  t:string=null;
  s:string=null;
  cd:string=null;
  c:string=null;
  md:string=null;
  v2?:number;
  c2?:string;
  constructor(){}
}
export interface Query{
  rgId:number;
  aId:string;
  __v?:number;
  s?:number;
  uId?:string;
  v2?:number;
}
export class CacheArticle{
  model:any;
  as:any;
  db:any;
  next:any=()=>{};
  constructor(as,db){
    this.as=as;
    this.db=db;
  }
  store=(data:articleData,cb)=>{
    data.id=this.as.aId;
    this.model.upsert(data.id,data,cb);
  };
  filterData(data:any){
    let article=data.d,
      projection=new articleData(),
      newData:any={};
    for(let i in projection){
      newData[i]=article[i]
    }
    if(article.v2&&article.c2){
      newData.v2=article.v2;
      newData.c2=article.c2;
    }
    return newData;
  }
  getPage(start,cb){
    let as=this.as;
    let send=(query:Query,fn)=>{
      this.as.http.post(this.as.url.viewPlate,query,1000).then(v=>v?fn(v):cb(false));
    };
    this.db.use('article',{keyPath:'id'}).then(model=>{
      this.model=model;
      let version=this.as._rs.selectRgVersion;
      let v2=this.as._rs.selectRgVersion2;
      //let uId=this.as.baseParams.auId;
      let query:Query={
        aId:as.aId,
        rgId:as.rgMsn.rgId
      };
      //uId&&(query.uId=uId);
      let next=(v)=>{
          this.as._rs.selectRgVersion=v.d.__v;
          this.as._rs.selectRgVersion2=v.d.v2;
          cb(v);
      };
      if(start==1){
          model.findOne(as.aId.toString(),(err:any,data:articleData)=>{
          let storeV,storeV2;
          try{
            storeV=+data.__v;
            storeV2=+data.v2;
          }catch(e){}
          let dealAll=(v)=>{
            this.store(this.filterData(v),()=>next(v));
          };
          let dealPart=(v)=>{
            Object.assign(v.d,data);next(v);
          };
          if(version!==undefined){
            //enter by nav
            if(storeV!==version){
              send(query,dealAll);
            }else if(v2&&v2!=storeV2){
              query.__v=-3;
              send(query,(v)=>{
                Object.assign(v.d,data);
                dealAll(v);
              });
            }else{
              query.__v=-1;
              send(query,dealPart);
            }
          }else{
            //enter by url:
            if(storeV!==undefined){
              query.__v=storeV;
              storeV2&&(query.v2=storeV2);
              send(query,v=>{
                v.d.c||v.d.c2?dealAll(v):dealPart(v)
              });
            }else{
              send(query,dealAll);
            }
          }
        })
      }else{
        query.__v=-2;
        query.s=start;
        send(query,next);
      }
    });
  }
}
