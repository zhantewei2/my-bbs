import {trigger,state,style,transition,animate,keyframes} from '@angular/animations';
let time='0.3s ease-out';

export function fontColor(t=time){
  return trigger('FontColor',[
    state('normal',style({})),
    state('change',style({})),
    transition('normal=>change',[
      animate(t,keyframes([
        style({'box-shadow':'0 0 6px 6px gainsboro',offset:0}),
        style({'box-shadow':'0 0 3px 3px gainsboro',transform:'scale(1.2,1.2)',offset:0.5}),
        style({'box-shadow':'none',offset:1})
      ]))
    ])
  ])
}


