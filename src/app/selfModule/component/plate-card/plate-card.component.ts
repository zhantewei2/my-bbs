import { Component, OnInit,Input} from '@angular/core';
import {RouterService} from 'app/service/router.service';
import {slideTopToggle} from 'app/selfModule/animations/animate';

import {ResizeService} from 'app/service/resize.service';
@Component({
  selector: 'plate-card',
  templateUrl: './plate-card.component.html',
  styleUrls: ['./plate-card.component.css'],
  host:{
    'class':'col-lg-6'
  },
  animations:[slideTopToggle()]
})
export class PlateCardComponent implements OnInit {
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
