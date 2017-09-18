import { Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AdminService,BreakPg} from '../admin.service';
import {FormBuilder} from '@angular/forms';
import {toFormGroup,addControl} from 'app/util/FormData';
import {RouterService} from 'app/service/router.service';
const pageSize=(window as any).myCommon.replyPs;
const transactionUser=(window as any).myRefer.transactionUser;
interface viewArticleQuery{
  rgId:number;
  aId:string;
  s?:number;
}

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  rgId:number;
  cgId:number;
  aId:string;
  modifyArticleUrl:string='/admin6/dealArticle';
  putImg:any=(window as any).myCommon.putImg;
  viewArticleUrl:string='/router/viewPlate';
  viewReplyUrl:string='/router/getReply';
  breakPg:BreakPg;
  articleMsn:any;
  hostUser:any;
  isArticleEdit:boolean=false;
  articleStartArr:Array<string>=(window as any).myCommon.publishCg;
  constructor(
    private route:ActivatedRoute,
    public _admin:AdminService,
    private _fb:FormBuilder,
    public _rs:RouterService
  ){
    this.route.params.subscribe((v:any)=>{
      if(!v)return;
      const params=v.articles.split('_');
      this._admin.articleSelectRgId=this.rgId=params[1];
      this.cgId=params[0];
      this._admin.articleSelectAId=this.aId=v.aId;
      this.getPage(1);
    })
  }
  ngOnInit(){}
  hostContent:any;
  replyLists:Array<any>;
  reset=()=>this.msnForm();

  getPage(page,ztwPg?){
    const query:viewArticleQuery={
      rgId:this.rgId,
      aId:this.aId
    };
    let url=this.viewArticleUrl;
    if(page>1){
      query.s=(page-1)*pageSize+1;
      url=this.viewReplyUrl;
    }
    this._admin.http.post(url,query).then(v=>{
      if(!v||!v.r){
        if(ztwPg)ztwPg.loading=false;
        this._admin.throwErr('This article no exist!');
        return;
      }
      if(!this.breakPg){
        const totals=v.d.rps;
        this.breakPg=new BreakPg(pageSize,totals);
      }
      this.breakPg.nowPage=page;
      if(v.d){
        this.articleMsn=v.d;
        this.hostUser=this._admin.articleHostUser=transactionUser(v.d.user);
        this.msnForm();
      }
      this.replyLists=v.r;
    })
  }
  _msnForm:any;
  _msnFormGroup:any;
  _msnOld:any;
  msnForm(){
    let v=this.articleMsn;
    let genControl=(name,value,validator,type,label,disabled=false)=>{
      return {
        name:name,
        value:value,
        validator:validator,
        type:type,
        label:label,
        disabled:disabled
      }
    };
    let forms=[
      genControl('t',v.t,['required','minLength(4)','maxLength(40)'],'text','Article Title'),
      genControl('cd',v.cd,['required'],'date','Create Date'),
      genControl('lrd',v.lrd,['required'],'date','Latest Reply Date')
    ];
    if(v.md)forms.push(genControl('md',v.md,['required'],'date','Last Modify'));
    forms=forms.concat([
      genControl('rds',v.rds,['required'],'number','ReaderShip'),
      genControl('__v',v.__v,['required'],'number','Version'),
      genControl('rps',v.rps,null,'text','Replies',true),
      genControl('s',v.s,['required'],'select','Category')
    ]);
    this._msnOld=toFormGroup(forms);
    this._msnFormGroup=this._fb.group(this._msnOld);
    for(let i in this._msnOld){
      this._msnOld[i].pop();
    }
    addControl(this._msnFormGroup,forms);
    this._msnForm=forms;
  }

  submitModify(e){
    let hasModify={},formValue=this._msnFormGroup.value;
    for(let i in formValue){
      let d0=this.articleMsn[i];
      if(d0!==undefined){
        let d1=formValue[i];
        if(d1 instanceof Date){
          if(d1.getTime()!=(new Date(d0)).getTime())hasModify[i]=d1.toJSON();
        }else if(d1!=d0){
          hasModify[i]=d1;
        }
      }
    }
    const isEmpty=Object.keys(hasModify).length;
    const str=JSON.stringify(hasModify);
    this._admin.modalContent=isEmpty?{content:`<p>以下为改动的数据:</p>${str}`,btnType:'double'}:{content:'没有数据改动'};
    this._admin.modalResult=isEmpty?(e)=>e&&this._admin.http.post(this.modifyArticleUrl,{m:1,id:this.aId,rgId:this.rgId,d:hasModify}).then(v=>v?this._admin.throwErr('修改成功')&&this.updateMsn(hasModify):this._admin.throwErr('修改失败')):()=>{};
    this._admin.modal.open();
  }
  updateMsn=(obj:any)=>Object.assign(this.articleMsn,obj)&&this.msnForm()||(this.isArticleEdit=false);
  modifyContent(){
    this.articleMsn.aId=this.aId;
    this._rs.navToPublish(this.cgId,this.rgId,this.articleMsn);
  }
}
