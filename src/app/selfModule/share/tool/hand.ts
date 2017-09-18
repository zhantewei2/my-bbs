import {Observable} from 'rxjs'
import 'rxjs/add/observable/fromEvent';
export const moveEvent=(node:any,begin?:Function,cb?:Function,end?:any,noDis?:boolean)=>{
  node.classList.add('noSelect');
  let origin:any={},disX:number=0,disY:number=0,rect;
  const dis=(e:any)=>{
      rect=node.getBoundingClientRect();
      disX=e.pageX-rect.left;
      disY=e.pageY-rect.top-window.pageYOffset;
    },
    ori=(e:any,start?:boolean)=>{
      origin.x=Math.round(e.pageX-disX);
      origin.y=Math.round(e.pageY-disY);
      if(origin.x<0&&origin.y<0)return;
      return origin;
    },
    startOri=(e:any)=>{
      !noDis&&dis(e);
      ori(e)&&begin(origin)
    },
    moveOri=(e:any)=>ori(e)&&cb(origin);
  const subs:any={},
    clearSub=(params:any)=>{
      params.forEach((sub:any)=>{
        if(!subs[sub])return;
        subs[sub].unsubscribe();
        subs[sub]=null;
      });
    };
  const touchStartOb=Observable.fromEvent(node,'touchstart',false),
    touchMoveOb=Observable.fromEvent(node,'touchmove'),
    touchEndOb=Observable.fromEvent(node,'touchend');
  subs.touchStartSub=touchStartOb.subscribe((e:any)=>{
    startOri(e.targetTouches[0]);
    e.preventDefault()
  });
  subs.touchMoveSub=touchMoveOb.subscribe((e:any)=>{
    e.preventDefault();
    moveOri(e.targetTouches[0]);
  }),
    subs.touchEndSub=end&&touchEndOb.subscribe(end);
  let mouseUpSub:any,mouseMoveSub:any;
  const mouseMoveOb=Observable.fromEvent(document,'mousemove'),
    mouseUpOb=Observable.fromEvent(document,'mouseup'),
    mouseDownOb=Observable.fromEvent(node,'mousedown');
  let i=0;
  const clearMouseSub=()=>clearSub(['mouseMoveSub','mouseUpSub']);
  subs.mouseDownSub=mouseDownOb.subscribe((e:any)=>{

    startOri(e);
    clearMouseSub();
    const cancel=()=>{
      clearMouseSub();
      end&&end();
    };
    subs.mouseMoveSub=mouseMoveOb.subscribe(moveOri);
    subs.mouseUpSub=mouseUpOb.subscribe(cancel);
  });
  return ()=>{
    for(let i in subs){
      subs[i]&&subs[i].unsubscribe();
    }
  }
};
