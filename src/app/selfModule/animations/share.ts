import {trigger,transition,style,animate,state,keyframes} from '@angular/animations';
let defaultT='0.3s ease-out';

export function pop(t=defaultT){
  return trigger('Pop',[
    state('hidden',style({visibility:'hidden'})),
    state('show',style({visibility:'visible'})),
    transition('hidden=>show',[
      animate(t,keyframes([
        style({visibility:'visible',opacity:0,transform:'scale(0.5,0.5)',offset:0}),
        style({opacity:1,transform:'scale(1.2,1.2)',offset:0.7}),
        style({opacity:1,transform:'scale(1,1)',offset:1})
      ]))
    ]),
    transition('show=>hidden',[
      animate('0.2s',style({opacity:0,transform:'scale(0.5,0.5)'}))
    ])
  ])
}
