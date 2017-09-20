import { Component, OnInit,Input,ChangeDetectionStrategy} from '@angular/core';
import {Router} from '@angular/router';
import {RemindService} from 'app/service/remind.service';
import {TotalService} from 'app/service/total.service';
import {HttpService} from 'app/service/http.service';
import {ParentService} from './parent.service';
import {fade} from 'app/selfModule/animations/animate';
const pageSize=6;
class History{
  set totals(val){this.pages=Math.ceil(val/pageSize);this.hid=val};
  get totals(){return this.hid};
  hid:number;
  pages:number;
  now:number;
}

@Component({
  templateUrl: './self-ntf.component.html',
  styleUrls:['./self-ntf.component.css'],
  providers:[ParentService],
  animations:[fade()]
})
export class SelfNtfComponent implements OnInit {
  url:string='/user/manage/ntf';
  select:any=1;
  tp:any;
  loading:boolean;
  constructor(
    public _remind:RemindService,
    public _ts:TotalService,
    private http:HttpService,
    public _ps:ParentService,
    private router:Router
  ) {}
  ngOnInit(){
    this._ts.isLogined().then(v=>{
      if(!v)this._remind.closeNtf();
      this.user=this._ts.userMsn;
      this.user.ntfSelf?this.getNtf():this.lists=this._remind.cacheNtfs;
      this._ps.navTo=this.navTo.bind(this);
    })
  }
  user:any;
  totals:number;
  pageModel:any;
  lists:any;
  lists2:any;
  getNtf(){
    this.loading=true;
    this.clearRel();
    this.http.post(this.url).then(v=>{
      if(!v||v<0)return;
       this._remind.cacheNtfs=this.lists=v;
      this.user.ntfSelf=0;
       v.forEach(i=>i.cd=new Date(i.cd).getTime());
       this._ps.useModel().then((model:any)=>{
         v.asyncForEach(
           (list,next)=>{list.cd=new Date(list.cd).getTime();model.insert(list,()=>next())},
           ()=>{this.loading=false}
         );
       });

    })
  }

  navTo(msn){
    const rgUrl=msn.p.cg+'_'+msn.p.rg;
    const base=['plates',rgUrl,msn.thId];
    //mark read;
    msn.read=true;
    this._ps.model.purePut(msn,()=>{});
    //
    if(!msn.f){
      this.router.navigate(base);
    }else{
      const f=msn.f.toString(),now=msn.p.now;
      const opts:any={fragment:msn.f.toString()};
      const id=base[2]=msn.thId.split('_')[0];
      if(now)opts.queryParams={now:now};
      this.router.navigate(base,opts);
      if(this._remind.isInner)this._remind.aInnerNav(id,now,f);
    }
    setTimeout(()=>{this._remind.closeNtf();},1)
  }
  selectValue:any;
  selectTab(e){
    this.selectValue=e;
    if(e==2)this.getHistory(null,null);
  }
  history:History=new History();
  getHistory(page:any,dr:any){
    this._ps.useModel().then(model=>{
      const
      history=this.history,
      hCursor=this._remind.historyCursor;
      if(!page)page=this._remind.historyPage||1;
      this._remind.historyPage=page;
      ((cb)=>{
        !history.totals&&history.totals!=0?model.size((err,data)=>{history.totals=data;cb()}):cb();
      })(()=>{
        let storeCursor=(v)=>{
          try {
            hCursor.start = v[0].cd;
            hCursor.end = v[v.length - 1].cd;
          }catch(e){this._ts.throwErr(e)}
        };
        let getMsn=(dr,page,cb)=>{
          if(dr===null&&page==1){
            model.getList(pageSize,[],'cd','prev').then(v=>cb(v));
          }else if(dr=='end'){
            const count=history.totals%pageSize;
            model.getList(count||pageSize,[],'cd').then(v=>cb(v.reverse()));
          }else if(dr=='next'){
            model.getList(pageSize,[],'cd','prev',IDBKeyRange.upperBound(hCursor.end,true)).then(v=>cb(v));
          }else if(dr=='pre'){
            model.getList(pageSize,[],'cd','next',IDBKeyRange.lowerBound(hCursor.start,true)).then(v=>cb(v.reverse()));
          }else{
            model.getList(pageSize,[],'cd','prev',IDBKeyRange.upperBound(hCursor.start)).then(v=>cb(v));
          }
        };
        getMsn(dr,page,(v)=>{
          if(!v||!v.length)return this.lists2=null;
          storeCursor(v);
          this.lists2=v;
          history.now=page;
        })
      });
    });
  }
  clearRel(){
    this.history.totals=null;
    this._remind.historyPage=null;
  }
  clearHistory(e){
    if(!e)return;
    this._ps.model.removeAll(()=>{
      this.lists2=null;
      this.clearRel();
    });
  }
}

@Component({
  selector:'ntf-list',
  template:`
      <li class="btn0 btn-block between parent" (click)="_ps.navTo(i)">
         <div class="read right text-lg">
            <i [hidden]="!i.read" class="text-primary fa fa-check-square-o"></i>
         </div>
         <span *ngIf="i.f" >
           您在<b>{{i.ab}}</b>的回复收到<kbd>{{i.c}}</kbd>条消息
         </span>
         <span *ngIf="!i.f">
           您的<kbd>主题</kbd><b>{{i.ab}}</b>收到<kbd >{{i.c}}</kbd>条消息
         </span>
         <span>{{i.cd |time}}</span>
      </li>`,
  styles:[
    'b{margin:0 5px}',
    'li{padding:15px 5px}',
    '.read{opacity:0.3;text-shadow:1px 2px 3px white;transform:rotate(30deg)}'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ntfListComponent {
  constructor(public _ps:ParentService){}
  @Input()i;
}
