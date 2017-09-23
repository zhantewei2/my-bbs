import { Component, OnInit,Input,ElementRef} from '@angular/core';
import {RouterService} from 'app/service/router.service';

@Component({
  selector: 'article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.css'],
  host:{
    'class':'list-group-item listItem column',
    '(click)':'!preventNav&&goto()'
  }
})
export class ArticleCardComponent implements OnInit {
  @Input()preventNav:boolean;
  @Input()parent:any;
  i:any;
  isHot:boolean;
  isNew:boolean;
  isPretty:boolean;
  @Input() set msn(val){
    this.i=val;
    const disT:any=new Date().getTime()-Date.parse(val.cd);
    const hm=1000*60*60,dm=1000*60*60*24;
    this.isHot=(val.rds>1000&&disT<dm*8);
    this.isPretty=(val.rps>100&&disT<dm*30);
    this.isNew=disT<hm*6;
  };
  @Input()rgId;
  @Input()cgId;
  constructor(
    private _rs:RouterService,
    private _el:ElementRef
  ) { }
  goto(){
    let p=this.parent,i=this.i;
    if(p){
      i.isRead=true;
      p.cache(this._el.nativeElement.id);
      p.model.insert({aName:p.getKey(i._id)},()=>{})
    }
    this._rs.selectRgVersion=i['__v'];
    this._rs.selectRgVersion2=i.v2;
    this._rs.navToArticle(this.cgId,this.rgId,i._id);
  }
  ngOnInit() {
  }
}
