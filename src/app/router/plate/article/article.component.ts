import {Component, OnInit,ViewChild,OnDestroy} from '@angular/core';
import {ActivatedRoute,Router} from '@angular/router';
import {RouterService} from 'app/service/router.service';
import {TotalService} from 'app/service/total.service';
import {ArticleService} from './children/article.service';
import {InnerReplyService} from './children/inner-reply.service';
import {RemindService} from 'app/service/remind.service';

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
    }
  }
  ngAfterViewInit(){
    this._as.ztwScroll=this.ztwScroll;
  }
  back(){
    this._rs.navPlate(this.rgMsn.cgId,this.rgMsn.rgId);
  };
  scrollValue:any;
  overTitle:boolean;
  _overTitle(val:string){
    if(!this.titleNav)return;
    this._rs.nav.node.style.transform=(this.overTitle=val=='down')?'translateY(-100%)':'translateY(0)';
  }
  whenBound=(obj)=>{
      let as=this._as;
      if(as.state.pageLoad||as.state.preventWhenBound)return;
      let totalH=document.querySelector('body').scrollHeight;
      if(obj.bottom>=totalH-5){
        this._as.method.getReply('down').then(v=>{

        });
      }
  };
  linkUrlPage(now){
    let msn=this.rgMsn;
    this.router.navigate(['../',this._as.aId], {
        queryParams:{now:now},
        relativeTo:this.route});
  }

  getScrollValue(e){
    if(e>0&&typeof e=='number'){
      this._as.breakPage.nowPage=e;
      this.linkUrlPage(e);
    }
  }

  ngOnDestroy(){
    this._as.clear();
    this._remind.isInner=false;
    this._rs.nav.node.style.transform='translateY(0)'
  }
}
