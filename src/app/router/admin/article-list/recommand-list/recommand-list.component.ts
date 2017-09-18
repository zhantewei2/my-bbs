import { Component, OnInit,Input } from '@angular/core';
import {AdminService} from '../../admin.service';
import {recommendSize} from '../../config';
@Component({
  selector: 'admin-recommand-list',
  templateUrl: './recommand-list.component.html',
  styleUrls: ['./recommand-list.component.css'],

})
export class RecommandListComponent implements OnInit {
  @Input()parent;
  beginOnce:boolean;
  recommendUrl:string='/admin6/recommendArticle';
  @Input()set begin(val){
    if(!val||this.beginOnce)return;
    this.beginOnce=true;
    this.getList();
  }
  selectId:any;
  lists:any=[];
  loading:boolean;

  getList=()=>{
    const query:any={
      rgId:this.parent.rgId,
      m:'get'
    };
    this.loading=true;
    this._admin.http.post(this.recommendUrl,query).then(v=>{
      this.loading=false;
      if(!v){
        this._admin.throwErr('网络错误');
      }else if(v=='empty'){
        this._admin.throwErr('该板块还没有推荐文件');
      }else{
        this.lists=v;
      }
    })
  };
  constructor(
    public _admin:AdminService
  ) { }
  accept(item){
    let len=this.lists.length;
    if(this.lists.find(v=>v._id==item._id))return;
    if(len>recommendSize)return this.error='超过最大列数';
    this.lists.push(item);
  }
  error:string;
  ngOnInit() {

  }
  replace(i,j){
    let lists=this.lists;
    let temp=lists[i];
    lists[i]=lists[j];
    lists[j]=temp;
  }
  up(i){
    if(i<=0)return;
    this.replace(i,i-1);
  }
  down(i){
    if(i>=this.lists.length-1)return;
    this.replace(i,i+1);
  }
  close(i){
    this.lists.splice(i,1);
  }
  confirm(){
    let as=this.lists.map(v=>v._id);
    let query:any={
      rgId:this.parent.rgId,
      as:as
    }
    this._admin.http.post(this.recommendUrl,query).then(v=>{
      if(!v)this._admin.throwErr('失败');
      this._admin.throwErr('写入成功');
    })
  }
}
