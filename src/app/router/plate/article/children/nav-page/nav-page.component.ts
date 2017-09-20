import { Component, OnInit,Input} from '@angular/core';
import {ArticleService} from '../article.service';
import {slideTopToggle2} from 'app/selfModule/animations/animate';
@Component({
  selector: 'nav-page',
  templateUrl: './nav-page.component.html',
  styleUrls: ['./nav-page.component.css'],
  animations:[slideTopToggle2()]
})
export class NavPageComponent implements OnInit {
  @Input()show;

  load:boolean=false;
  constructor(public _as:ArticleService) {
    this.page=_as.breakPage;
  }
  page:any;
  ngOnInit(){}

  change(e){
    let as=this._as;
    let method=as.method,ztwScroll=as.ztwScroll;
    let result=method.filterIndex(e),state=method.state;
    if(!result&&state){
      //nested boundary
      ztwScroll.scrollTo(e);
    }else if(result){
      as.state.preventWhenBound=true;
      if(result==state){
        //load appoint page
          as.method.getReply(result, true).then(v=>v&&setTimeout(()=>{ztwScroll.scrollTo2(200)},1));
      }else if(state=='down'){
        as.state.preventWhenBound=false;
        ztwScroll.scrollTo('ztw_bottom');
      }else{
          as.method.getReply(result, true).then(()=>setTimeout(()=>{ztwScroll.scrollTo('ztw_top')},1))
      }
    }
  }
}
