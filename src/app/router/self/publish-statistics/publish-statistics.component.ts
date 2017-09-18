import { Component,Input } from '@angular/core';
import {TotalService} from 'app/service/total.service';
import {fade} from 'app/selfModule/animations/animate';
import {DateBP} from 'app/util/BreakPage';
import {aPageSize} from '../config';
import {RouterService} from 'app/service/router.service';

export interface Base{
  rgId:number;
  rgName:string;
  cgId:number;
  cgName:string;
}
export interface Select{
  cg?:string;
  rg?:string;
}
export interface FindUA{
  pgTool?:DateBP;
  articles?:Array<any>;
  base?:Base;
}

@Component({
  selector: 'publish-statistics',
  templateUrl: './publish-statistics.component.html',
  styleUrls: ['./publish-statistics.component.css'],
  animations:[fade()]
})
export class PublishStatisticsComponent{
  articlesUrl:string='/um/articles';
  constructor(
    private _ts:TotalService,
    private _rs:RouterService
  ) {
    if(!this._rs.addon.findUA){
      this.findUA={base:{}};
      this.base=this.findUA.base;
      this._rs.addon.findUA=this.findUA;

    }else{
      this.findUA=this._rs.addon.findUA;
      this.base=this.findUA.base;
    }
  }
  findUA:any;
  base:any;
  @Input()userId;

  rgId:number;
  cgId:number;
  selectRg(cg,rg){
    Object.assign(this.base,{
      rgName:rg.name,
      cgName:cg.name,
      rgId:rg.id,
      cgId:cg.id
    });
    this.configBP();
    this.getArticles(1,null);
  }
  configBP(){
    this.findUA.pgTool=new DateBP(this._ts.http,this.articlesUrl,aPageSize);
  }
  getArticles(page,dr){
    let query={
      uI:encodeURIComponent(this.userId),
      rg:this.base.rgId
    };
    this.findUA.pgTool.getPage(query,page,dr).then(v=>{
      this.findUA.articles=v?v:null;
    });
  }

}
