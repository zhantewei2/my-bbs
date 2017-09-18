import { Component, OnInit,ViewChild,Input } from '@angular/core';
import {AdminService} from '../../admin.service';
import {UserService} from 'app/service/user.service';
const removeNode=(query,end,container?)=>{
  const node=container?container.querySelector(query):document.querySelector(query);
  if(node){
    node.parentNode.removeChild(node);
    removeNode(query,end,container);
  }else{end()}
};
const prefixPath=(window as any).myCommon.putImg('');
@Component({
  selector: 'admin-plate-brief',
  templateUrl: './plate-brief.component.html',
  styleUrls: ['./plate-brief.component.css']
})
export class PlateBriefComponent implements OnInit {
  upImgUrl:string='/admin6/upImg';
  briefUrl:string='/admin6/brief';
  constructor(
    public _admin:AdminService,
    public _us:UserService
  ) { }
  @ViewChild('myEdit')myEdit;
  @Input()parent;
  ngOnInit(){}
  imgConfig:any;
  imgQuery=(relPath)=>`img[src='${prefixPath+relPath}']`;
  ngAfterViewInit(){
    let imgConfig=this.imgConfig=this.myEdit.config.upImg;
    imgConfig.prefix=prefixPath;
    this._us.getStrategy().then((v:any)=>imgConfig.limitSize=v.img.plate);
    this.getBrief(()=>{
      imgConfig.result.subscribe(obj=>{
        let admin=this._admin;
        if(obj.type=='add'){
          admin.http.postUp(this.upImgUrl,obj.val).subscribe(v=>{
            if(!v){
              admin.throwErr('网络错误');
            }else if(v=='over'){
              admin.throwErr('图片超出最大限制');
            }else{
              obj.next(v);
            }
          })
        }else if(obj.type=='remove'){
          this._admin.modalContent={content:'确定删除这张图?已插入相关的图片将会被一起删除！',btnType:'double'};
          this._admin.modalResult=(e)=>{
            if(e){
              admin.http.post(this.briefUrl,{s:'del',url:obj.val}).then(result=>{
                if(!result)return obj.next(false);
                removeNode(this.imgQuery(obj.val),()=>obj.next(true),this.myEdit.textNode);
              })
            }else{
              obj.next(false);
            }
          };
          this._admin.modal.open();
        }
      })
    });
  }
  getBrief(cb){
    let next=(data)=>{
      if(!data)return cb();
      this.imgConfig.initList=data.imgs||[];
      this.myEdit.textNode.innerHTML=this._admin._compress.decode(data.c);
      cb()
    };
    if(this.parent.cacheBrief){
      next(this.parent.cacheBrief);
    }else{
      this._admin.http.post(this.briefUrl,{rgId:this.parent.rgId,s:'view'}).then(v=>{
        if(v)next(this.parent.cacheBrief=v.brief)
      });
    }

  }
  publish():any{
    let imgList=this.imgConfig.getImgs();
    let delImg=[];
    if(imgList){
      let container=this.myEdit.textNode,newArr=[];
      imgList.forEach((v)=>{
        let node=container.querySelector(this.imgQuery(v));
        !node?delImg.push(v):newArr.push(v)
      });
      imgList=newArr;
    }
    let html=this.myEdit.getHTML();
    if(html){
      let query:any={
        s:'insert',
        c:this._admin._compress.encode(html),
        rgId:this.parent.rgId
      };
      if(imgList&&imgList.length)query.ul=imgList;
      if(delImg.length)query.delImg=delImg;
      return this._admin.http.post(this.briefUrl,query).then(v=>{
       if(!v) return false;
       return this.parent.cacheBrief={c:query.c,imgs:imgList};
      });
    }else{
      return Promise.resolve(false);
    }
  }

  handle(category){
    let content,result;
      if (category == 'publish') {
        content='确认提交修改';
        result=()=>{
          this.publish().then(v=>{
            if(!v)return this._admin.throwErr('修改失败！');
            this._admin.throwErr('版区简介设置成功!');
            this.getBrief(()=>{});
          })
        }
      }else if(category=='restore'){
        content='恢复以前的数据?';
        result=()=>this.getBrief(()=>{});
      }else{
        content='清除所有数据?';
        result=()=>{
          this.myEdit.textNode.innerHTML='';
          this.imgConfig.initList=[];
        }
      }
      this._admin.modalContent={content:content,btnType:'double'};
      this._admin.modalResult=(e)=>e&&result();
      this._admin.modal.open();
  }
}
