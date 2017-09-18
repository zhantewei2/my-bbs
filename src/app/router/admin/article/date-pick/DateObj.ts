const isNumber=(window as any).myObj.isNumber;
export class DateObj{
  checkD(month){
    this.max.d=(month==2&&(this.isLeapYear?29:28))||([1,3,5,7,8,10,12].indexOf(month)>=0?31:30);
    if(this.d>this.max.d)this.d=this.max.d;
  }
  set y(val){
    this.hidY=val;
    this.isLeapYear=!!((!(val%4)&&val%100)||(!(val%100)&&!(val%400)));
    this.checkD(this.M);
  };
  get y():number{return this.hidY}
  set M(val){
    this.checkD(val);
    this.hidM=val;
  };
  get M():number{return this.hidM}
  d:number;
  h:number;
  m:number;
  s:number;
  ms:number;
  isLeapYear:boolean;
  hidY:number;
  hidM:number;
  max:any={
    M:12,
    d:undefined,
    h:23,
    m:59,
    s:59,
    ms:999
  };
  filedArr:Array<string>=['y','M','d','h','m','s','ms'];
  getDate(){
    let arr=this.filedArr.map(v=>{return v=='M'?this[v]-1:this[v]});
    arr.unshift(null);
    return new (Function.prototype.bind.apply(Date,arr));
  }
  constructor(dateStr:any){
    const date=new Date(isNumber(dateStr)?+dateStr:dateStr);
    this.y=date.getFullYear();
    this.M=date.getMonth()+1;
    this.d=date.getDate();
    this.h=date.getHours();
    this.m=date.getMonth();
    this.s=date.getSeconds();
    this.ms=date.getMilliseconds();
  }
}
