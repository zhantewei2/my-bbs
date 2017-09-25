import { Component, OnInit,Input,HostBinding} from '@angular/core';
import {RouterService} from 'app/service/router.service';

import {homeCard,slideTopToggle,xLine} from 'app/selfModule/animations/animate';
import {ResizeService} from 'app/service/resize.service';
@Component({
  selector: 'plate-card',
  templateUrl: './plate-card.component.html',
  styleUrls: ['./plate-card.component.css'],
  host:{
    'class':'col-lg-7 homeCard m-3 d-flex parent',
    '(mouseleave)':'isEnter=false;show="hid"',
    '(mouseenter)':'isEnter=true;show="show"',
    '(click)':'click()'
  },
  animations:[slideTopToggle('0.1s ease-out'),homeCard(),xLine()]
})
export class PlateCardComponent implements OnInit {
  @HostBinding('@homeCard')show:string='hid';
  @Input('plateMsn')msn;
  @Input('cg')cg;
  putImg:any=(window as any).myCommon.putImg;
  constructor(
    public _rs:RouterService,
    public _res:ResizeService
  ) { }
  loading:boolean;
  click(){
    this.loading=true;
    this._rs.navPlate(this.cg,this.msn.id);
  }
  ngOnInit() {

  }
  isEnter:boolean=false;
  isEnter0:boolean=false;
}
