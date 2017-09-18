import { Component,ViewChild} from '@angular/core';
import {ActivatedRoute,Router} from '@angular/router';
import {AdminService} from '../admin.service';
import {DateBP} from 'app/util/BreakPage';
import {slideRightToggle} from 'app/selfModule/animations/animate';
const pageSize=(window as any).myCommon.pageSize;
interface RemoveQuery{
  aId:string;
  auId:string;
  rgId:number;
  cgId:number;
}


@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css'],
  animations:[slideRightToggle()]
})
export class ArticleListComponent {
  cgId:number;
  rgId:number;
  articleUrl:string='/router/plates';
  removeArticleUrl:string='/admin6/dealArticle';
  articles:any;
  _bp:DateBP;
  state:string='default';
  findItem:any;
  cacheBrief:any;
  cacheCover:any;
  isEmpty:boolean;
  @ViewChild('dropdown')dropdown;
  getArticleList=(page=1,dr?)=>{
    const query:any={rgId:this.rgId,cgId:this.cgId};
    if(!this._bp){
      this._bp=new DateBP(this._admin.http,this.articleUrl,pageSize,'post',{time:'lrd'});
    }
    this._bp.getPage(query,page,dr).then(v=>{
      if(!v)return this.isEmpty=true;
      this.articles=v;
    })
  };
  navI=(name)=>this.nestedNav(this.state!=name?name:'default');

  nestedNav=(n)=>this.router.navigate(['./'],{relativeTo:this.route,queryParams:{state:n}});

  constructor(
    private route:ActivatedRoute,
    public _admin:AdminService,
    private router:Router
  ) {
    this.route.params.subscribe((v:any)=>{
      try {
        const msn = v.articles.split('_');
        this.cgId=msn[0];
        this.rgId=msn[1];
      }catch(e){
        this._admin.throwErr('地址错误');
      }
      this.route.queryParams.subscribe((v:any)=>{
        let state=this.state=v.state;
        if(state)this._admin.isEdit=true;
        if(state=='cover')setTimeout(()=>{this.dropdown.open()},1)
      });
      //setTimeout(()=>{this._admin.isEdit=false},1);
      this.getArticleList();
    })
  }
 removeArticle(aId,aTitle,au){
    this._admin.modalContent={content:`
        该操作将删除作者<kbd>${au.n}</kbd>，标题为:<p><code>${aTitle}</code></p>
        <p>编号为<code>${aId}</code>的文章</p>
        <p>请确认此操作!</p>
    `,
      btnType:'double'
    };
    this._admin.modalResult=(e)=>{
      if(!e)return;
      const query:RemoveQuery={
        aId:aId,
        auId:au.n,
        cgId:this.cgId,
        rgId:this.rgId
      };
      this._admin.http.post(this.removeArticleUrl,query).then(v=>{
        if(!v)return this._admin.throwErr('删除失败');
        this._admin.throwErr('删除成功');
        this.getArticleList();
      })
    };
    this._admin.modal.open();
 }
}
