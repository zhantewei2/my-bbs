import { Component, OnInit} from '@angular/core';

const common=(window as any).myCommon;
@Component({
  selector:'select-img-0',
  templateUrl: './select-img-0.component.html',
  styleUrls: ['./select-img-0.component.css']
})
export class SelectImg0Component implements OnInit {
  hasImg:any;
  putImg:any=common.putImg;
  upImg:any=null;
  imgArr:Array<string>;
  err:any;

  constructor() { }
  ngOnInit() {

    this.imgArr=[];
    let load1=false,load2=false;
    for(let i=1,len=common.imgCount;i<=len;i++){
      this.imgArr.push('_'+i+'.jpg');
    }

    let next=()=>{
      if(load1&&load2)this.upImg={data:this.data,buffer:this.buffer};
    };
    this.imgDataUrl.onload=(e)=>{
      load1=true;
      this.data=e.target.result;
      next();
    };
    this.imgBuffer.onload=(e)=>{
      load2=true;
      this.buffer=e.target.result;
      next();
    };
  }

  imgBuffer:any=new FileReader();
  imgDataUrl:any=new FileReader();
  data:any;
  buffer:any;
  fileChange(e){
    this.err=null;
    this.upImg=null;
    try {
      let file = e.target.files[0];
      if (file.size > 1024 * 500)return this.err='图片超过最大限制';
      if(!/\.(jpg|jpeg|png|gif)$/.test(file.name))return this.err='图片格式错误';
      this.imgBuffer.readAsArrayBuffer(file);
      this.imgDataUrl.readAsDataURL(file);
    }catch(e){console.log(e)};
  }


}
