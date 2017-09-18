export function getPos(node):any{
  const rect=node.getBoundingClientRect(),p:any={};
  p.left=rect.left;
  p.top=rect.top+window.pageYOffset+document.documentElement.clientTop;
  p.w=rect.width;
  p.h=rect.height;
  return p;
}
export function resizePos(pos,w){
  if(pos.left){
  let dis=pos.left+w-window.innerWidth;
  if(dis>0)pos.left=pos.left-dis-20;
  pos.left=pos.left<0?0:pos.left;
  }
  for(let i in pos){pos[i]+='px'};
}
export function tooltipPos(handleNode,tipNode,placement){
  let pos:any=getPos(handleNode),np:any={};
  let body=document.querySelector('body');
  let height=body.offsetHeight;
  let getB=(top)=>height-top;
    const mid=(base,len,len2)=>base+len/2-len2/2,
      w=tipNode.offsetWidth,
      h=tipNode.offsetHeight,
      newPos=(k1,val1,k2,val2)=>(np[k1]=Math.round(val1))&&(np[k2]=Math.round(val2));
    switch(placement){
      case 'top':
        newPos('bottom',getB(pos.top),'left',mid(pos.left,pos.w,w));
        break;
      case 'bottom':
        newPos('top',pos.top+pos.h,'left',mid(pos.left,pos.w,w));
        break;
      case 'left':
        newPos('top',mid(pos.top,pos.h,h),'right',body.offsetWidth-pos.left);
        break;
      case 'right':
        newPos('top',mid(pos.top,pos.h,h),'left',pos.left+pos.w);
    }
    resizePos(np,w);
    return np;
}
