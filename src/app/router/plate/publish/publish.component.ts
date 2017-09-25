import { Component, OnInit,ViewChild} from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import {TotalService} from 'app/service/total.service';
import {DataBaseService} from 'app/service/data-base.service';
import {ResizeService} from 'app/service/resize.service';
import {FormControl,Validators} from '@angular/forms';
import {limitValidator} from 'app/util/FormData';
import {RouterService} from 'app/service/router.service';
import {slideX,fade,slideXLine} from 'app/selfModule/animations/animate';
import {HttpService} from 'app/service/http.service';
import {UserService} from 'app/service/user.service';
import {lzwService} from 'app/service/util.service';
import {PublishService} from './publish.service';
const common=(window as any).myCommon;
const publishCg=common.publishCg;
const textInterval=common.textInterval;


export interface SetMsn{
  s:string;
  c:string;
  t:string;
}
export interface Mf{
  init:any;
  original:SetMsn;
}
@Component({
  selector: 'app-publish',
  templateUrl: './publish.component.html',
  styleUrls: ['./publish.component.css'],
  animations:[slideX(),fade(),slideXLine()],
  providers:[PublishService]
})
export class PublishComponent implements OnInit {
  mfPattern:boolean;
  startCg:Array<string>=publishCg;
  start:string;
  posObj:any;
  draftModel:any;
  preDraft:any;
  draft:any;
  nowDraft:any;
  showStore:boolean=false;
  textNode:any;
  showWarn:boolean=false;
  showDraft:boolean=false;
  showDrafts:boolean=false;
  dfListChg:boolean=true;
  dfList:Array<any>=[];
  @ViewChild('addDfTp')addDtTp;
  titleControl:any=new FormControl('',[Validators.required,limitValidator(3,22)]);
  dfNameControl:any=new FormControl('',[Validators.required,limitValidator(1,7)]);
  resOrder:any;

  constructor(
    public _db:DataBaseService,
    private route:ActivatedRoute,
    public _ts:TotalService,
    public _rs:RouterService,
    private http:HttpService,
    public _us:UserService,
    public _ps:PublishService,
    public _lzw:lzwService,
    public _res:ResizeService
  ){
    _rs.nav.hidden=_res.value=='sm';
    this.resOrder=_res.resizeVal.subscribe(v=>_rs.nav.hidden=v=='sm');
  };

  @ViewChild('textEditor')textEditor;
  cb:any=()=>{};
  modal:any;
  ngAfterViewInit(){
    this.modal=this._ts.modal;
    const ps=this._ps;
    ps.modal=this.textEditor.modal;
    ps.textEditor=this.textEditor;
  }
  ngOnDestroy(){
    this._rs.nav.hidden=false;
    this.resOrder.unsubscribe();
  }
  ngOnInit() {
    //hidden nav for mobile:
    this._rs.leave_pub=()=>this.textEditor.getHTML().length>16;
    this.start=this.startCg[0];
    this.route.data.subscribe((v:any)=>{
      this.posObj=v.data;
      this.textNode=this.textEditor.textarea.nativeElement;
      this._db.useModel('main').then((model:any)=>{
          this.cb();
          const transmitData=this._rs.transmit;
          //nav from modify article;
          if(transmitData){
            this.mf.init(transmitData);
          }else {
            model.findOne('draft', (err, data) => {
              if (!data)return;
              this.preDraft = data;
              this.showWarn = true;
            })
          }
          this.autoStore();
      });
    })
  }

  mf:any={
    init:(data)=> {
      this.mf.msn=this.setMsn(data);
      this.mf.fix={
        aId:data.aId,
        rgId:this.posObj.rgId
      };
      this._rs.transmit = null;
      this.mfPattern = true;
    },
    fix:null,
    msn:null
  };

  draftEdit(){
    if(!this.showDraft) {
      this._db.useModel('main').then((model:any)=> {
        model.findOne('draft', (err, data) => {
          this.draft = data;
          this.showDraft = true;
        })
      });
    }else{
      this.closeEditDf();
    }
  }
  setMsn(msn:SetMsn){
    let obj:any={};
    this.titleControl.setValue(obj.t=msn.t);
    this.start=obj.s=msn.s;
    this.textNode.innerHTML=obj.c=msn.c;
    msn=null;
    return obj;
  }
  submit1(target){
    //upload msn;
    let msn:any;
    let ps=this._ps;
    const sn:any=ps.selectItem;
    //stg:
    if(sn){
      const selectObj=ps.useLimit[sn];
      let query0:any={},is0;
      if(sn=='vote'){
        let obj={n:selectObj.name,v:{}};
        selectObj.list.forEach(v=>obj['v'][v.name]=0);
        query0.v=obj;
        is0=false;
      }else if(sn=='pay'){
        query0.p={g:selectObj};
        is0=true;
      }else{
        query0.rv=true;is0=true;
      }
      msn=this.getMsn(is0);
      if(!msn)return;
      msn.stg=query0;
    }else{
      msn=this.getMsn();
      if(!msn)return;
    }
    //....stg;

    if(!this.mfPattern) {
      const pos = this.posObj,
        user = this._ts.userMsn,
        msn2: any = {
          cgId: pos.cgId,
          rgId: pos.rgId,
          auId: user.name,
          auN: user.nickN
        };
      Object.assign(msn, msn2);
    }else{
      const obj={},
        mf=this.mf,
        oldMsn=this.mf.msn;
      for(let i in msn){
        if(msn[i]!=oldMsn[i])obj[i]=msn[i];
      }
      if(Object.keys(obj).length==0)return this._ts.throwErr('没有改动');
      msn=Object.assign(obj,mf.fix);
      msn.mf=1;
    }
    if(msn.c)msn.c=this._lzw.encode(msn.c);
    if(msn.c2)msn.c2=this._lzw.encode(msn.c2);
    this.http.postWithVf(this._ts.url.publish,msn).then(v=>{
      if(!v)return this._ts.throwErr('未知错误');
      //modify:
      if(this.mfPattern){
        this.modal(
          {content:'修改成功！确认为您返回原路径。',btnType:'double'},
          e=>e&&this._rs.pub_redirect()
        );
      }else{
        this._us.appendExp('publish');
        this._ts.alert('您的文章已发布!');
        this._rs.pub_redirect();
      }
    });

  }
  closeW(){
    this.showWarn=false;
    this.preDraft=null;
  }
  setShowStore(){
    if(this.showStore)return;
    this.showStore=true;
    setTimeout(()=>{this.showStore=false;},1000);
  }
  getMsn(txt2?){
    let msn:any={t:this.titleControl.value,s:this.start};
    if(!txt2){
      let html=this.textEditor.getHTML();
      msn.c=html;
      return html?msn:false;
    }else{
      let content=this.textEditor.getAll();
      msn.c=content.txt;
      msn.c2=content.txt2;
      return msn.c&&msn.c2?msn:false;
    }
  }
  autoStore(time=textInterval){
    let textNode=this.textNode;
    let leave=false,interval;
    let store=()=>{
      if(leave)return;
      this.setShowStore();
      let msn:any=this.getMsn();
      if(!msn)return;
      msn.d=Date();
      this._db.useModel('main').then((model:any)=>model.upsert('draft',msn,()=>{}));
    };
    textNode.onfocus=()=>{
      if(interval)return;
      leave=false;
      interval=setInterval(store,textInterval)
    };
    textNode.onblur=()=>{
      leave=true;
      if(interval){
        clearInterval(interval);
        interval=null;
      }
    }
  }
  closeEditDf(){
    this.showDraft=false;
    this.showDrafts=false;
    this.customDf.cancelEdit();
  }

  ensureDf(draft){
    this.modal({
      content:'确认恢复？该操作将覆盖文本编辑区域。',
      btnType:'double'
    },e=>e&&this.setMsn(draft)&&this.closeEditDf())
  }
  getDf(){
    const field1='_ngz_date';
    this.dfListChg=false;
    this.draftModel.getList(5,['t',field1,'n']).then(data=>{
      data.forEach(v=>v.d=new Date(v[field1]));
      this.dfList=data;
    })

  };
  getDfs(){
    if(!this.draftModel){
      this._db.useModel('draft').then(model=>{
        this.draftModel=model;
        this.getDf();
      })
    }else if(this.dfListChg){
      this.getDf();
    }
  }
  customDf:any={
    editing:false,
    delArr:[],
    storeList:{},
    confirm:()=>{
      this._ts.closeModal();
      let msn:any=this.getMsn();
      msn.n=this.dfNameControl.value;
      this.dfNameControl.reset('');
      if(!msn.c)return this.modal('内容不能为空');
      this.draftModel.insert(msn,(err,data)=>data?this.getDf()||this.modal('写入成功'):this.modal('写入失败，文件名重复!'))
    },
    cancel:()=>{
      this._ts.closeModal();
      this.dfNameControl.reset('');
    },
    setDf:(n)=>{
      this.draftModel.findOne(n,(err,data)=>{
        this.ensureDf(data);
      })
    },
    add:()=>this.modal(this.addDtTp),
    edit:()=>{
      let csf=this.customDf;
      csf.editing=true;
      csf.storeList=JSON.parse(JSON.stringify(this.dfList));
    },
    cancelEdit:()=>{
      let csf=this.customDf;
      if(csf.delArr.length)this.dfList=csf.storeList;
      csf.editing=false;
      csf.delArr=[];
    },
    delI:(itemN)=>{
      this.customDf.delArr.push(itemN);
      let list:any=this.dfList;
      list.splice(list.findIndex(v=>v.n==itemN),1);
    },
    cfMf:()=>{
      let csf=this.customDf;
      let str='';
      csf.delArr.forEach(v=>{
        str+='<code>'+v+'</code> '
      });
      str+='?';
      this.modal(
        {
          type:'danger',
          content:'确定删除'+str,
          btnType:'double'
        },
        (e)=>{
          if(!e){
            csf.cancelEdit();
          }else {
            csf.delArr.asyncForEach(
              (val,next) => {
                this.draftModel.remove(val, next);
              },
              ()=>{
                csf.delArr=[];
                csf.editing = false;
                this.getDf();
              }
            );
          }
       });
    }
  };

}
