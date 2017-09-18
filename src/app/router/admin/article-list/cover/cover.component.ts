import { Component, OnInit } from '@angular/core';
import {ArticleListComponent} from '../article-list.component';
import {TotalService} from 'app/service/total.service';
import {UserService} from 'app/service/user.service';
@Component({
  selector: 'admin-plate-cover',
  templateUrl: './cover.component.html',
  styleUrls: ['./cover.component.css']
})
export class CoverComponent implements OnInit {
  rgMsn:any;
  rgId:any;
  cgId:any;
  putImg:any=(window as any).myCommon.putImg;
  upImgUrl:string='/admin6/upImg';
  coverUrl:string='/admin6/cover';
  isChangeImg:boolean;
  originContent;
  constructor(
    private parent:ArticleListComponent,
    public _ts:TotalService,
    public _us:UserService
  ) {}
  ngOnInit() {
    this.rgId=this.parent.rgId;
    this.cgId=this.parent.cgId;
    this.rgMsn=this._ts.cgs[this.cgId]['rgs'][this.rgId];
    this.originContent=this.rgMsn.cover.c;
  }
  updateCover(imgBuffer,c){
    const http=this._ts.http;
    const upCover=()=>{
      http.post(this.coverUrl,{rgId:this.rgId,c:c,cgId:this.cgId}).then(v=>{
        if(!v)return this._ts.throwErr('false');
        Object.assign(this.rgMsn.cover,v);
        this._ts.alert('封面更新成功！')
      })
    };
    if(imgBuffer){
      const queryString=http.stringifyObj({cover:1,rgId:this.rgId,cgId:this.cgId});
      const imgUrl=this.upImgUrl+queryString;
      http.postUp(imgUrl,imgBuffer).subscribe(v=>{
        if(!v)return this._ts.throwErr('上传图片失败!');
        upCover();
      })
    }else{upCover()}
  }
  confirm(){
    const text=this.originContent;
    if(!this.imgBuffer&&text==this.rgMsn.cover.c)return this._ts.throwErr('没有改动');
    let str='<kbd>改动简介为:</kbd>'+text;
    if(this.imgBuffer)str+=',本次改动包括了封面图片';
    str+='。是否执行？';
    this._ts.modal(
      {content:str,btnType:'double'},
      (e)=>e&&this.updateCover(this.imgBuffer,text)
    )
  }
  imgBuffer:any;
  imgDataUrl:any;
  showImg:boolean;
  overSize:boolean;
  changeFile(e){
    let file=e.target.files[0];
    this._us.getStrategy().then((strategy:any)=>{
      let imgLimit=strategy.img.cover;
      if(file.size>imgLimit)return this.overSize=true;
      let fr1=new FileReader();
      let fr2=new FileReader();
      fr1.onload=(e)=>{
        this.imgDataUrl=(e.target as any).result;
        this.showImg=true;
      };
      fr2.onload=(e)=>{
        this.imgBuffer=(e.target as any).result;
      };
      fr1.readAsDataURL(file);
      fr2.readAsArrayBuffer(file);
    })
  }
  destroyImg(){
    this.isChangeImg=false;
    this.imgDataUrl=null;
    this.imgBuffer=null;
  }
}
