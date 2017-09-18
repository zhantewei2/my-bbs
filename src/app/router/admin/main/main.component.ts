import { Component, OnInit,ViewChild,HostBinding} from '@angular/core';
import {TotalService} from 'app/service/total.service';
import {Router} from '@angular/router';
import {HttpService} from 'app/service/http.service';
import {AdminService} from '../admin.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  rgUrl:string='/admin6/rg';
  cgUrl:string='/admin6/cg';
  @ViewChild('addTp')addTp;
  url:any={
    handleRg:'/admin6/dealRg'
  };
  constructor(
    public _ts:TotalService,
    private router:Router,
    public http:HttpService,
    public _admin:AdminService
  ){}
  ngAfterViewInit(){
  }
  obj:any=Object;
  isAdmin:boolean;
  isEdit:boolean;
  addIsRg:boolean;
  cgs:any;
  rgs:any;
  originRgsJSON:any={};
  initCgs=()=>{
    this._ts.getCgs().then(cgs=>{
      if(!cgs||!Object.keys(cgs).length)return ;
      let rgs:any={};  //cgId:{ value:Array,exists:false|true};
      for(let i in cgs){
        let rgs0=cgs[i].rgs;
        rgs[i]={};
        if(!Object.keys(rgs0).length){
          rgs[i].exists=false;
        }else {
          rgs[i].exists=true;
          let arr=[];
          for (let j in rgs0) {
            arr.push(rgs0[j])
          }
          rgs[i].value=arr;
        }
      }
      this.cgs=cgs;
      this.rgs=rgs;
    })
  };
  ngOnInit(){
    setTimeout(()=>{this._admin.isEdit=false;},1);
    this._ts.isLogined().then(v=>{
      const type=this._ts.userMsn.type;
      if(!v||!(type=='admin'||type=='manager'))return this.router.navigate(['/']);
      this.isAdmin=type=='admin';
      this.initCgs();
    })
  }
  endResult=(result,text,pure?)=>!result?this._admin.throwErr('false'):this._admin.showFooter(text)||!pure&&this._ts.initHome().then(this.initCgs);
  sureAdd:any=()=>{};
  addRg(cgId){
    this.addIsRg=true;
    this._admin.modalContent=this.addTp;
    this.sureAdd=(name)=>{
      this._admin.modal.close();
      const query:any= {
        cgId:cgId,
        rgName:name,
        m:'add'
      };
      this.http.post(this.rgUrl,query).then(v=>this.endResult(v,'已添加'+name+'板块!'));
    };
    this._admin.modal.open();
  }
  removeRg(cgId,rgId){
    this._admin.modalContent={
      content:`确定删除该板块?<br><var class="text-danger">该操作将删除板块的所有文章及回复！</var>`,
      btnType:'double'
    };
    this._admin.modalResult=(e)=>{
      if(!e)return;
      let query:any={
        cgId:cgId,
        rgId:rgId,
        m:'remove'
      };
      this.http.post(this.rgUrl,query).then(v=>this.endResult(v,'删除编号为'+rgId+'的版区成功！'));
    };
    this._admin.modal.open();
  }
  refresh(){
    this._ts.initHome().then(v=>{
      this.initCgs();
      this.endResult(v,'刷新列表成功',true)
    });
  }
  addCg(){
    this.addIsRg=false;
    this._admin.modalContent=this.addTp;
    this.sureAdd=(name)=>{
      this._admin.modal.close();
      const query={m:'add',cgName:name};
      this.http.post(this.cgUrl,query).then(v=>this.endResult(v,'添加版区成功'))
    }
    this._admin.modal.open();
  }
  removeCg(cgId){
    this._admin.modalContent={
      content:'确定删除这个版区,这将删除所有板块，及其内的文章！',
      btnType:'double'
    };
    this._admin.modalResult=(e)=>{
      if(e){
        const query={m:'remove',cgId:cgId};
        this.http.post(this.cgUrl,query).then(v=>this.endResult(v,'删除成功'))
      }
    };
    this._admin.modal.open();
  }
  beginSort(id){
    if(this.sortId==id){
      this.sortId=null;
      this.resetSort(id);
    }else{
      this.sortId=id;
      if(!this.originRgsJSON[id])this.originRgsJSON[id]=JSON.stringify(this.rgs[id].value);
    }
  }
  exchangeArr(i,j,arr){
    let iObj=arr[i],
        jObj=arr[j],
        iOrder=iObj.order,
        jOrder=jObj.order;
    iObj.order=jOrder;
    jObj.order=iOrder;
    arr[i]=jObj;
    arr[j]=iObj;
  }
  rgSort(cgId,rg,index,isNext){
    const sort=rg.sort,
      rgArr=this.rgs[cgId].value,
      lastIndex=rgArr.length-1;
    if(isNext){
      index<lastIndex?this.exchangeArr(index,index+1,rgArr):this.exchangeArr(0,lastIndex,rgArr);
    }else{
      index!=0?this.exchangeArr(index-1,index,rgArr):this.exchangeArr(0,lastIndex,rgArr);
    }
  }
  resetSort(cgId){
    if(this.originRgsJSON[cgId])this.rgs[cgId].value=JSON.parse(this.originRgsJSON[cgId]);
  }
  sortId:number;
  confirmSort(cgId){
    let arrNow=this.rgs[cgId].value;
    let arrOrigin=JSON.parse(this.originRgsJSON[cgId]);
    let changeObj={},str='',id;
    arrNow.forEach(v=>{
      id=v.id;
      const oldItem=arrOrigin.find(v=>v.id==id);
      if(v.order!=oldItem.order){
        changeObj[id]=v.order;
        str+=id+',';
      }
    });
    if(!str)return this._admin.throwErr('没有改动');
    str=str.slice(0,-1);
    this._admin.modalContent={content:'已改动的板块的id分别为:<code>'+str+'</code>确定改动?',btnType:'double'};
    this._admin.modalResult=(e)=>{
      if(e){
        const query={cgId:cgId,change:changeObj,m:'sort'};
        this.http.post(this.rgUrl,query).then(v=>{
          if(v){
            this.originRgsJSON[cgId]=null;
            this.endResult(v, '板块排序成功！')
          }
        })
      }
    };
    this._admin.modal.open();
  }
}
