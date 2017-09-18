import {Component, OnInit,ViewChild,OnDestroy} from '@angular/core';
import {ActivatedRoute,Router} from '@angular/router';
import {RouterService} from 'app/service/router.service';
import {TotalService} from 'app/service/total.service';
import {ArticleService} from './children/article.service';
import {InnerReplyService} from './children/inner-reply.service';
import {RemindService} from 'app/service/remind.service';
let setOnce=(window as any).myObj.setOnce;
@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
  providers:[ArticleService,InnerReplyService]
})
export class ArticleComponent implements OnInit,OnDestroy {
  constructor(
    private route:ActivatedRoute,
    private router:Router,
    public _rs:RouterService,
    public _ts:TotalService,
    public _as:ArticleService,
    public _irs:InnerReplyService,
    public _remind:RemindService
  ) { }
  rgMsn:any;
  arId:any;
  data:any;
  href:any;
  @ViewChild('ztwScroll')ztwScroll;
  @ViewChild('titleNav')titleNav;
  ngOnInit(){
    this.route.data.subscribe((queryP:any)=>{
      const data=queryP.data;
      const next=function(id,page,fragment){
        this.arId=id;
        this._as.clear();
        this._as.init(
          this.rgMsn=data,
          this.arId,
          page,
          fragment&&this.navFragment(fragment)
        );
      }.bind(this);
      this._remind.isInner=true;
      this._remind.aInnerNav=next;
      let idSub=this.route.params.subscribe((v:any)=>{
        next(v.aId,+data.now||1,data.fragment);
        setTimeout(()=>idSub.unsubscribe());
      });
    });
  }
  navFragment(frag){
    return ()=>{
      setTimeout(() => {
        const node=document.getElementById('reply'+frag);
        if(node)this.ztwScroll.scrollToNode(node).then(()=>node.firstElementChild.classList.add('remind'));
      }, 1);
      let node = document.getElementById('reply' + frag);
    }
  }
  ngAfterViewInit(){
    this._as.ztwScroll=this.ztwScroll;
  }
  back(){
    this._rs.navPlate(this.rgMsn.cgId,this.rgMsn.rgId);
  };
  preGt:boolean=false;
  titleOnce:any=new setOnce();
  navOnce:any=new setOnce();
  showNavIcon:boolean;
  scrollValue:any;
  method:any={
    controlTitleNav:(obj)=>{
      const titleNav=this.titleNav;
      if(!titleNav)return;
      let n=this._rs.nav,
        top=n.hiddenTop,
        title=titleNav._el.nativeElement,
        nav=n.node,
        height=n.height,
        v=obj.top,
        top2=top+height;

      let d=v-top;
      if(v>top){
        this.showNavIcon=true;
        if(v<top2){
          this.titleOnce.once(title,height-d+'px');
          this.navOnce.once(nav,0-d+'px');
        }else{
          title.style.top=0;
          this.navOnce.once(nav,0-height+'px');
        }
      }else{
        this.titleOnce.once(title,height+'px');
        this.navOnce.once(nav,0);
        this.showNavIcon=false;
      }
    },
    whenBound:(obj)=>{
      let as=this._as;
      if(as.state.pageLoad||as.state.preventWhenBound)return;
      let totalH=document.querySelector('body').scrollHeight;
      if(obj.bottom>=totalH-5){
        this._as.method.getReply('down').then(v=>{

        });
      }
    }
  };
  linkUrlPage(now){
    let msn=this.rgMsn;
    this.router.navigate(['../',this._as.aId], {
        queryParams:{now:now},
        relativeTo:this.route});
  }
  scrollEvent(obj){
    this.method.controlTitleNav(obj);
    this.method.whenBound(obj);

  }
  getScrollValue(e){
    if(e>0&&typeof e=='number'){
      this._as.breakPage.nowPage=e;
      this.linkUrlPage(e);
    }
  }

  ngOnDestroy(){
    this._rs.nav.node.style.top=0;
    this._as.clear();
    this._remind.isInner=false;
  }
}
