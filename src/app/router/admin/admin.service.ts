import { Injectable } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import {HttpService} from 'app/service/http.service';
import {lzwService} from 'app/service/util.service';
@Injectable()
export class AdminService {
  constructor(
    private router:Router,
    private route:ActivatedRoute,
    public http:HttpService,
    public _compress:lzwService
  ) { }
  isEdit:boolean=false;
  _throwErr:any;
  throwErr:any=(e)=>this._throwErr=e;
  getArticles=(cgId,rgId)=>cgId+'_'+rgId;
  modal:any;
  modalContent:any;
  showFooter:any=()=>{};
  modalResult:any=()=>{};
  articleSelectAId:string;
  articleSelectRgId:number;
  articleHostUser:any;
  navToArticles(cgId,rgId){
    this.router.navigate(['admin6',this.getArticles(cgId,rgId)]);
  };
  navToArticle(cgId,rgId,aId){
    this.router.navigate(['admin6',this.getArticles(cgId,rgId),aId]);
  }
}

export class BreakPg{
  nowPage:number;
  pageSize:number;
  set totals(val){
    this.hid=val;
    this.pages=Math.ceil(val/this.pageSize);
  }
  get totals(){return this.hid}
  hid:number;
  pages:number;
  constructor(pageSize,totals=null){
    this.pageSize=pageSize;
    if(totals)this.totals=totals;
  }
}
