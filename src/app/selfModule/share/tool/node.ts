export function listenOnce(node,event,cb){
    let once=()=>{
      cb();
      node.removeEventListener(event,once);
    };
    node.addEventListener(event,once);
}
