import { Component, OnInit,ViewChild} from '@angular/core';
import {TotalService} from 'app/service/total.service';
import {PublishService} from '../publish.service';
import {UserService} from 'app/service/user.service';
import {fadeToggle} from 'app/selfModule/animations/animate';
@Component({
  selector: 'my-strategy',
  templateUrl: './strategy.component.html',
  styleUrls: ['./strategy.component.css'],
  animations:[fadeToggle()],
  host:{
    '(click)':'click()'
  }
})
export class StrategyComponent implements OnInit {
  @ViewChild('tp')tp;
  @ViewChild('voteForm')voteForm;
  limit2:number=1000;
  payStg:any=(window as any).myCommon.pay;
  constructor(
    public _ps:PublishService,
    public _us:UserService,
    public _ts:TotalService
  ){}
  strategy:any;
  voteObj:any={
    name:null,
    list:[],
    len:0
  };
  isConfirm:boolean;
  ngOnInit(){}
  select:any;
  option:any;
  click(){
    this._ps.modal.getResult(this.tp,'其他功能',true).then(result=>{
      let sub=this._ps.modal.closeSubject.subscribe(v=>{
        this.select=null;
        sub.unsubscribe();
      })
    });
    this._us.getStrategy().then(v=>this.strategy=v)
  }
  close(){
    this.select=null;
    this._ps.modal.close();
  }
  confirm(){
    let ps=this._ps;
    if(this.select=='pay'){
      const num=ps.useLimit.pay;
      if(!num)return this.close();
      ps.setLimit({pay:num});
      this._ts.throwErr('成功设置支付金币为:'+num+'。');
      ps.textEditor.txt2Begin('以下内容为支付'+num+'金币,可见',this.limit2);
    }else if(this.select=='vote'){
      if(!this.voteForm.valid)return this._ts.throwErr('填写未全或超出最大字数');
      if(this.voteObj.len<=0)return this._ts.throwErr('缺少投票选项');
      ps.setLimit({vote:this.voteObj});
      ps.textEditor.txt2Remove();
      this._ts.throwErr('已附加投票');
    }else{
      this._ts.modal(
        {content:'确认为回复可见，点击关闭取消该设置',btnType:'double'},
        (e)=>{
          if(e){
            ps.setLimit({rView:1});
            ps.textEditor.txt2Begin('以下可编辑区为回复可见',this.limit2);

          }else{
            ps.clearLimit('rView');
            ps.textEditor.txt2Remove();
          }
        }
      );
    }
    this.close();
  }
  clear(){
    this._ps.clearLimit(this.select);
    if(this.select=='vote'){
      Object.assign(this.voteObj,{
        name:null,
        list:[],
        len:0
      })
    }else{this._ps.textEditor.txt2Remove()}
  }
  addList(){
    this.voteObj.list.push({
      name:null,
      value:0,
      edit:false
    });
    this.voteObj.len++;
  }
  removeItem(index){
    this.voteObj.list.splice(index,1);
    this.voteObj.len--;
  }
  focusItem(i){
    this.voteObj.list.forEach((v,index)=>{
      if(index!=i)v.edit=false;
    })
  }
  entryItem(item,nextNode){
    item.edit=true;
    setTimeout(()=>{
      nextNode.focus();
    })
  }
}
