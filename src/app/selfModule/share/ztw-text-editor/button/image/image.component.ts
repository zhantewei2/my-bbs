import { Component, OnInit,HostListener,Input,HostBinding,ViewChild} from '@angular/core';
import {parent} from '../../total.service';
import {fade} from '../../../../animations/animate';
import {Subject} from 'rxjs/Subject';
import {ToolService} from '../../../tool/tool.service';
interface ImgConfig{
  prefix:string;
  result:any;
  disUpload:boolean;
  initList?:any;
  limitSize:number;
  limitCount:number;
  getImgs:any;
}

/*
  <ztw-text-editor #myText></ztw-text-editor>
  @ViewChild('myText')myText
  let config=myText.config.upImg;
  config.result.subscribe(v=>{
    v:{
      type:'remove'|'add',
      val:,
      next:callBack
    }
  })
  config.limitSize=
  config.limitCount=
  1. get Imgs:const allUploadImgs=config.getImgs();
  2. set Imgs:config.initList=[]:Array<imgUrl>;
  3. disabled uploadImg: config.disUpload=true;
 */

@Component({
  selector: 'ztw-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css'],
  animations:[fade()]
})
export class ImageComponent implements OnInit {
  @HostBinding('class')hostClass='btn0 btn-icon';
  @ViewChild('tp')tp;
  @ViewChild('tp2')tp2;
  @Input()disUpload;
  constructor(
    public parent:parent,
    public _tool:ToolService
  ) { }
  inputHref:string;
  width:number;
  fr:any=new FileReader();
  fr2:any=new FileReader();
  btnC:string='btn borderR rgBtn btn0-inverse';
  @HostListener('mousedown',['$event'])hostDown(e){e.preventDefault()};
  @HostListener('click')hostClick(){
    this.parent.modal.getResult(this.tp,'insertImage',true).then(result=>this.preRange=result);
  }
  loading:boolean=false;
  buffer:any;
  imgData:any;
  tempImg:any;
  imgList:any=[];
  imgItem:number;
  parentNode:any;
  preRange:any;
  exists:any;
  showList:boolean;
  config:any;
  isEdit:boolean;
  ngOnInit() {
    this.fr.onload=(e)=>{
      this.buffer=e.target.result;
    };
    this.fr2.onload=(e)=>{
      this.imgData=e.target.result;
    };
    this.config=this.parent.config.upImg={
      result:new Subject(),
      getImgs:()=>this.imgList?this.imgList.map(v=>v.pre):null,
      limitCount:5
    };
    Object.defineProperty(this.config,'initList',{
      set:(val)=>{
        this.imgList=val.map(v=>this.filterPath(v));
        this.imgItem=0;
        this.showList=!!this.imgList.length;
      }
    })
  }
  filterPath=(path)=>{
    const prefix=this.config.prefix;
    return {pre:path,show:prefix?prefix+path:path};
  };
  ngAfterViewInit(){
    this.parentNode=this.parent.textarea.nativeElement.parentNode;
    this.width=this.parentNode.offsetWidth/2;
  }
  _event(fn,config){
    this.loading=true;
    let next=(opts)=>{
      this.loading=false;
      fn(opts);
    };
    config.next=next.bind(this);
    this.config.result.next(config);
  }
  upload(){
    this._event((url)=>{
      this.imgData=null;
      if(url){
        this.showList=true;
        this.imgList.push(this.filterPath(url));
        this.imgItem=this.imgList.length-1;
      }
    },{
      type:'add',
      val:this.buffer
    });
  }
  removeImg(i,url){
    this._event((bool)=>{
      if(!bool)return;
      this.imgList.splice(i,1);
      const len=this.imgList.length;
      if(!len)this.showList=false;
      let newItem=i;
      if(newItem>=len)newItem=i-1;
      this.imgItem=newItem;
    },{
      type:'remove',
      val:url
    });
  }
  overImg:boolean;
  fileChange(e){
    this.overImg=false;
    let node =e.target;
    let oFile=node.files[0],size=this.config.limitSize;
    if(!oFile)return;
    if(size&&oFile.size>size)return this.overImg=true;
    this.fr.readAsArrayBuffer(oFile);
    this.fr2.readAsDataURL(oFile);
  }
  addImg(){

  }
  reEl:any;
  clearRe(){
    let parent=this.reEl.parentNode;
    parent.removeChild(this.reEl);
    parent.className='';
    this.reEl=null;
  }
  addPicture(address){
    this.parent.modal.close();
    if(!this.preRange)return;
    let img=document.createElement('img'),
      a=document.createElement('a');
    a.appendChild(img);
    a.contentEditable='false';
    this.parent.addStyle(a,{
      position:'relative',
      display:'inline-block'
    });
    img.src=address;
    img.addEventListener('click',(e)=>{
      e.stopPropagation();
      if(this.reEl)return this.clearRe();
      a.className='shadow-1';
      let res=this.reEl=document.createElement('button');
      res.className='fr fa fa-arrows-alt btn btn-default';
      let y;
      this._tool.ztwMove(res,(e)=>{
        if(!y){
          y=img.offsetHeight-e.y;
        }else{
          img.style.height=y+e.y+'px';
        }
      });
      a.appendChild(res);
      this._tool.listenOnce(document,'click',()=>this.reEl&&this.clearRe())
    });
    this.preRange.insertNode(a);
    this.parent.resetFocus(a);
    this.inputHref=null;
  }
}
