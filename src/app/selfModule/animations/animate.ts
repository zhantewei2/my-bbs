import {trigger,transition,style,animate,state,query,stagger,animateChild} from '@angular/animations';
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
export function reply(t=defaultT,t2='.2s ease-out',
  style1={transform:'translateX(-50%)',opacity:0},
  style2={transform:'translateX(80%)',opacity:0}
){
  return trigger('Reply',[
    transition(':enter',[
      query('.reply',style(style1)),
      query('.text-right',[
        style(style2),
        animate(t,style('*'))
      ]),
      query('.reply',[
        animate(t,style('*'))
      ])
    ]),
    transition(':leave',[
      query('.text-right',[animate(t2,style(style2))]),
      query('.reply',animate(t2,style(style1)))
    ])
  ])
}
export function TitleNav(t='200ms cubic-bezier(0.35, 0, 0.25, 1)'):any{
  return trigger('TitleNav',[
    transition('*=>*',[
      query('.animate',[
        style({transform:'translateX(-50%) scale(1.2,1.2)',opacity:0}),
        stagger(150,[
          animate(t,style('*'))
        ])
      ],{optional:true})
   ])
  ])
}
export function homeCard(t=defaultT):any{
  return trigger('homeCard',[
    transition('hid=>show',[
      query('@XLine',[
        stagger(150,[
          animateChild()
        ])
      ]),
      query('@SlideTopToggle',[animateChild()])
    ])
  ])
}
export function xLine(
  t='.3s ease',
  style1={transform:'translate3d(100%,0,0)'},
  style2={transform:'translate3d(-100%,0,0)',opacity:0}
):any{
  return trigger('XLine',[
    state('hid',style({visibility:'hidden'})),
    transition('left=>hid',[animate(t,style(style1))]),
    transition('right=>hid',[animate(t,style(style2))]),
    transition('hid=>left',[style(style1),animate(t)]),
    transition('hid=>right',[style(style2),animate(t)])
  ]);
}
