import {trigger,transition,style,animate,state,keyframes} from '@angular/animations';
let defaultT='0.3s ease-out';

export function slideRightToggle(t='0.3s ease-out',style1={transform:'translateX(-100%)',opacity:0.8}):any{
  return trigger('SlideRightToggle',[
    state('hidden',style({display:'none'})),
    state('show',style({display:'block'})),
    transition('hidden=>show',[style(style1),animate(t)]),
    transition('show=>hidden',[animate(t,style(style1))])
  ])
}
export function slideX(
  t=defaultT,
  show={transform:'translateX(0)'},
  hidden={transform:'translateX(100%)'}):any{
  return trigger('SlideX',[
    state('hidden',style(hidden)),
    state('show',style(show)),
    transition('hidden=>show',animate(t)),
    transition('show=>hidden',animate(t))
  ])
}
export function width(
  t=defaultT,
  style1={width:0,opacity:0}):any{
  return trigger('Width',[
    transition('void=>*',[style(style1),animate(t)]),
    transition('*=>void',[animate(t,style(style1))])
  ])
}
export function slideXToggle(
  t=defaultT,
  style1={transform:'translateX(100%)'}
):any{
  return trigger('SlideXToggle',[
    transition('void=>*',[style(style1),animate(t)]),
    transition('*=>void',[animate(t,style(style1))])
  ])
}

export function slideXLine(
  t=defaultT,
  showPre={transform:'translateX(100%)'},
  hidNext={transform:'translateX(-100%)'}
):any{
  return trigger('SlideXLine',[
    transition('void=>*',[style(showPre),animate(t)]),
    transition('*=>void',[animate(t,style(hidNext))])
  ])
}
export function slideTopToggle(t=defaultT,style1={transform:'translateY(100%)',opacity:0}):any{
  return trigger('SlideTopToggle',[
    transition('void=>*',[style(style1),animate(t)]),
    transition('*=>void',[animate(t,style(style1))])
  ])
}
export function height(t='0.3s ease',style1={height:0,opacity:0}):any{
    return trigger('Height',[
      transition('void=>*',[style(style1),animate(t)]),
      transition('*=>void',[animate(t,style(style1))])
    ])
}
export function slideTopToggle2(t=defaultT,style1={transform:'translateY(100%)',opacity:0}){
    return trigger('SlideTopToggle2',[
      state('hidden',style({display:'none'})),
      state('show',style({})),
      transition('hidden=>show',[style(style1),animate(t)]),
      transition('show=>hidden',[animate(t,style(style1))])
    ])
}

export function fade(t=defaultT,style1={opacity:0}):any{
  return trigger('Fade',[
    transition('void=>*',[style(style1),animate(t)]),
    transition('*=>void',[animate(t,style(style1))])
  ])
};

export function fadeToggle(t=defaultT,style1={opacity:0}):any{
  return trigger('FadeToggle',[
    state('show',style({})),
    state('hidden',style({display:'none'})),
    transition('hidden=>show',[style(style1),animate(t)]),
    transition('show=>hidden',[animate(t,style(style1))])
  ])
}

export function fadeOut(t='0.4s ease-out'):any{
  return trigger('FadeOut',[
    transition('void=>*',[style({opacity:0}),animate(t)]),
  ])
}

