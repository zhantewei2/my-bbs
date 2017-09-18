export function CheckHTML(html,limit,title,parent){
  if(html.length>limit){
    parent.modal.getResult(title+'超出最大字节','warning',true);
    return false;
  }else if(!html.length){
    parent.modal.getResult(title+'不能为空','warning',true);
    return false;
  }
  return html;
}
