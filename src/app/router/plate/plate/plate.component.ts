import { Component, OnInit ,ViewChild} from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import {HttpService} from '../../../service/http.service';
import {TotalService} from '../../../service/total.service';
import {RouterService} from '../../../service/router.service';
import {DateBP} from 'app/util/BreakPage';
import {DataBaseService} from 'app/service/data-base.service';
import{lzwService} from 'app/service/util.service';
import {height,fade} from 'app/selfModule/animations/animate';
const pageSize=(window as any).myCommon.pageSize;
export interface BP0{
  upP?:number;
  downP?:number;
  loadP:number;
  bound?:any;
}

@Component({
  selector: 'app-plate',
  templateUrl: './plate.component.html',
  styleUrls: ['./plate.component.css'],
  animations:[height(),fade()]
})
export class PlateComponent implements OnInit {
  cgId:number;
  rgId:number;
  showRc:boolean=true;
  showNtf:boolean=true;
  setId=(p,i)=>'ztw_'+p+'_'+i;
  getKey=aId=>this.rgId+'_'+aId;
  plates:Array<any>=[];
  rcPlates:Array<any>=[];
  @ViewChild('navBtn')navBtn;
  @ViewChild('myScroll')myScroll;

  briefContent:any;
  briefObj:any;
  isEmpty:boolean;
  constructor(
    public _rs:RouterService,
    public route:ActivatedRoute,
    public http:HttpService,
    public _ts:TotalService,
    public _db:DataBaseService,
    public _lzw:lzwService
  ) {
    route.data.subscribe((v:any)=>{
      const data=v.data;
      this.cgId=data.cgId;
      this.rgId=data.rgId;
      let msn=this._rs.cache.plate;
      this.briefObj=this._rs.cacheBrief;
      this.briefContent=this.briefObj[this.rgId];
      this.initDB().then(model=>{
        if(msn){
          Object.assign(this,msn);
          this._rs.cache.plate=null;
          setTimeout(()=>{
            window.scrollTo(0,msn._top);
            let node=document.getElementById(msn._pos);
            node&&node.classList.add('remind');
            this.goOnEvent();
          },1)
        }else{
          this.reLoad();
        }
      });
    })
  }
  _reload:boolean;
  reLoad(reload?){
    if(reload)this._reload=true;
    this._bp=null;
    this.plates=[];
    this.stopEvent=true;
    this.pageLoad=true;
    this.getPage(1);
  }
  _bp:DateBP;
  bp0:BP0={
    loadP:5
  };
  pageLoad:any;
  model:any;
  //init dataBase check article has read;
  initDB=()=>this._db.isInit().then(x=>this._db.db.use('aIsRead',{keyPath:'aName',type:'capped',limit:1000}).then(model=>this.model=model));
  getPage(p,dr?){
    let plates=this.plates,
      bp0=this.bp0;
    const query:any={rgId:this.rgId,cgId:this.cgId};
    if(!this._bp){
      this._bp=new DateBP(this.http,this._ts.url.plates,pageSize,'post',{time:'lrd'});
      bp0.upP=bp0.downP=1;
    }else{
      this.pageLoad=dr=='pre'?'up':'down';
    }
    this.navBtn&&(this.navBtn.loading=true);
    let t=!dr?null:plates.length&&(dr=='next'?plates[plates.length-1]['v'][pageSize-1].lrd:plates[0]['v'][0].lrd);
    let all=false;
    if(p==1){
      all=true;
      if(this.briefContent)query.bf=1;
    }
    this._bp.getPage(query,p,dr,t,all).then((v:any)=>{
      this.pageLoad=null;
      this.navBtn&&(this.navBtn.loading=false);

      if(!v)return this.isEmpty=true;
      if(p==1){
        if(v.rc){
          this.rcPlates=v.rc=='empty'?null:v.rc;
        }
        //cache Brief: cacheBrief[rgId]=selfBrief;
        if(v.brief&&v.brief.c)this.briefContent=this.briefObj[this.rgId]=this._lzw.decode(v.brief.c);
        v=v.d;
      }
      let cond=(bp0.downP-bp0.upP>=bp0.loadP-1);
      let prevent;
      let re=()=>setTimeout(()=>{this.myScroll.calControls()},1);
      //append article has read:
      v.asyncForEach((val:any,next)=>{
        this.model.findOne(this.getKey(val._id),(err,data)=>{
          if(data)val.isRead=true;
          next();
        })
      },()=>{
        //the isRead has been appended;
        if(p>bp0.downP){
          bp0.downP=p;
          if(cond){
            bp0.upP++;
            plates.shift();
            re()
          }
        }
        if(p<bp0.upP){
          bp0.upP=p;
          if(cond){
            bp0.downP--;
            plates.pop();
            plates.unshift({v:v,p:p});
            prevent=true;
            re();
          }
        }
        bp0.bound={up:bp0.upP,down:bp0.downP};
        if(!prevent)plates.push({v:v,p:p});
        this.goOnEvent();
        this._reload=false;
      });
    })
  }
  set scrollVal(val){
    if(this._bp&&val>0)this._bp.nowPage=val;
  }
  stopEvent:boolean;
  goOnEvent=()=>setTimeout(()=>{this.stopEvent=false},1);
  scrollTo(p,cb?){
    this.myScroll.scrollTo(p).then(v=>cb&&cb());
  }
  filterDr=(dr)=>{
    let now=this._bp.nowPage;
    if(dr=='pre'&&now<=1||dr=='next'&&now>=this._bp.pages)return false;
    return dr=='next'?this._bp.nowPage+1:this._bp.nowPage-1;
  };
  goPage=(dr)=>{

    let p:any=this.filterDr(dr),bp=this.bp0;

    if(!p)return;
    if(p>bp.downP){
      this.scrollTo('ztw_bottom')
    }else if(p<bp.upP){
      this.scrollTo('ztw_top',()=>{this._bp.nowPage=bp.upP;this.getPage(p,'pre')});
    }else{this.scrollTo(p);}
  };
  scrollEvent=(e)=>{
    if(this.stopEvent)return;
    let h=document.querySelector('body').scrollHeight;
    if(e.bottom>=h-2){
      this.stopEvent=true;
      this._bp.nowPage=this.bp0.downP;
      let p=this.filterDr('next');
      p&&this.getPage(p,'next');
    }
  };
  ngOnInit() {
  }
  cache(pos){
    this._rs.cache.plate={
      plates:this.plates,
      rcPlates:this.rcPlates,
      _bp:this._bp,
      bp0:this.bp0,
      _pos:pos,
      _top:this.myScroll.getScrollTop()
    };
  }
}
