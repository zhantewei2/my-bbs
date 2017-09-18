import { Component, OnInit,ElementRef,Input} from '@angular/core';
import {ArticleService} from '../article.service';
import {width} from 'app/selfModule/animations/animate';
import {RouterService} from 'app/service/router.service';
import {TotalService} from 'app/service/total.service';
@Component({
  selector: 'title-nav',
  templateUrl: './title-nav.component.html',
  styleUrls: ['./title-nav.component.css'],
  animations:[width()]
})
export class TitleNavComponent implements OnInit {
  @Input()showIcon:boolean;
  get href0(){return location.href}
  constructor(
    public _as:ArticleService,
    public _el:ElementRef,
    public _rs:RouterService,
    public _ts:TotalService
  ) { }
  ngOnInit() {
  }
  alertContent:string;
  back(){
    let msn=this._as.rgMsn;
    this._rs.navPlate(msn.cgId,msn.rgId);
  }
}
