import { Component, OnInit,ElementRef,Input} from '@angular/core';
import {ArticleService} from '../article.service';

import {RouterService} from 'app/service/router.service';
import {TotalService} from 'app/service/total.service';
import {TitleNav} from 'app/selfModule/animations/animate';
@Component({
  selector: 'title-nav',
  templateUrl: './title-nav.component.html',
  styleUrls: ['./title-nav.component.css'],
  animations:[TitleNav()]
})
export class TitleNavComponent implements OnInit {
  @Input()state:any;
  get href0(){return location.href}
  constructor(
    public _as:ArticleService,
    public _el:ElementRef,
    public _rs:RouterService,
    public _ts:TotalService
  ) { }
  ngOnInit() {
  }

  back(){
    let msn=this._as.rgMsn;
    this._rs.navPlate(msn.cgId,msn.rgId);
  }
}
