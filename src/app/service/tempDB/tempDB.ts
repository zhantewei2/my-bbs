export interface baseOpts{
  size:number;
  batch:number;
};
export class baseDB{
  size:number;
  now:number;
  store:any;
  batch:number;
 constructor(opts:baseOpts){
   this.size=opts.size+opts.batch;
   this.now=0;
   this.batch=opts.batch;
   this.store=new Map();
 }
 insert(key,val){
   this.store.set(key,val);
   if(++this.now>this.size)this.del()
 }
 del(){
   let keys=this.store.keys(),pos=1;
   for(let i=0;i<this.batch;i++){
     this.store.delete(keys.next().value);
   }
   this.now=this.now-this.batch;
 }
 remove(key){
   if(this.store.delete(key))this.now--;
 }
 find(key){return this.store.get(key)};
}


export class forwardPageDB{
  /*
    use it;
    let db=new forwardPageDB(pageSize,colles),colles;
    getData(page)=>{
      let data=db.getPage(page,colles);
      if(!data){
      return http.get(...).then(v=>{
          db.setPage(page,colles,v)
          return v;
        })
      }
      return Promise.resolve(data);
    }

   */
  version:number;
  store:any={};  //item:Array<any>;
  colles:number;
  pages:number;
  pgSize:number;
  constructor(pageSize:number,colles:number){
    this.pgSize=pageSize;
    this.init(colles)
  }
  init(colles){
    this.colles=colles;
    if(this.pages&&this.store[this.pages].length!=this.pgSize)this.store[this.pages]=undefined;
    this.pages=Math.ceil(colles/this.pgSize);
  }
  getPage(page,colles){
    if(!this.store[page]||colles!=this.colles)return false;
    return this.store[page];
  }
  setPage(page,colles,value){
    if(this.store[page]&&colles==this.colles)return false;
    this.store[page]=value;
    if(colles!=this.colles)this.init(colles);
  }
}
