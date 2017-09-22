import {Injectable} from '@angular/core';
import {Http,Headers,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/operator/map';
//import 'rxjs/add/operator/delay';
import {decrypt} from '../util/decrypt';
import {hostUrl} from '../util/common';
let option=new RequestOptions({
    headers:new Headers({
        'Content-Type':'application/json'
    }),
    withCredentials:true
});
let optsUp=new RequestOptions({
  headers:new Headers({
    'Content-Type':'text/event-stream'
  }),
  withCredentials:true
});

let realPath=(url)=>{return hostUrl+url};
const vfUrl='/user/vf';
@Injectable()
export class HttpService{
    constructor(public http:Http){};
    stringifyObj(obj){
        let str='?';
        for(let i in obj){
            if(str!=='?')str+='&';
            str+=i+'='+obj[i];
        }
        return str;
    }
    parseResult(result){
        let status=result.status;
        if(status==201){
            return true;
        }else if(status==200||status==304){
            let data=result['_body'];
            try{
                data=JSON.parse(data);
            }catch(e){}
            return data;
        }else{
            return false;
        }
    }

    get=(url,params?)=>{
        if(params)url+=this.stringifyObj(params);
        return  new Promise(resolve=>{
            this.http.get(realPath(url),option).subscribe((result:any)=>{
                resolve(this.parseResult(result));
            })
        })
    };
    post=(url,params={},time=0):Promise<any>=>{
        return new Promise(resolve=> {
          this.http.post(realPath(url), params, option).throttleTime(time).subscribe((result: any) => {
            resolve(this.parseResult(result));
          })
        })
    };
    postWithVf=(url,params:any={})=>{
      return this.post(vfUrl,{}).then(v=>{
        params.vf=decrypt(v);
        return this.post(url,params)
      })
    };
    postUp=(url,data)=>{
      return this.http.post(realPath(url),data,optsUp).map(v=>this.parseResult(v));
    }
}
