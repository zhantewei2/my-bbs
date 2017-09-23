export {vfKey} from './key';
export const val=['required','minLength(5)','maxLength(16)'];
export const imgCount=14;   //header img count;
export const hostUrl='';
export function putImg(name){
  return hostUrl+'/static/header/'+name;
}
export const epArr=[200,600,1200,2000,3000,4200,5600,7200,9000];
export const pay={min:10,max:50,step:10};
export const publishCg=['交流','分享','提问','心情','投票','其他'];
export const textInterval=20000;  //edit text auto storage interval time;
export const pageSize=12;
export const reply2Ps=5;
export const replyPs=10;
export const replyCache=2;
export const ntfPs=10;
export const dbConfig={
  name:'ZTWBBS',
  opts:{
    version:1
  }
};
