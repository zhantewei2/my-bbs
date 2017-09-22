import { Component ,Input} from '@angular/core';
import {trigger,transition,style,animate} from '@angular/animations';

import {fade} from 'app/selfModule/animations/animate';
@Component({
  selector: 'article-load-btn',
  templateUrl: './load-btn.component.html',
  styleUrls: ['./load-btn.component.css'],
  animations:[
    trigger('Top',[
      transition('void=>*',[style({top:0,opacity:0}),animate('0.3s ease-in')]),
      transition('*=>void',[animate('0.3s ease',style({top:0,opacity:0}))])
    ]),
    trigger('Bottom',[
      transition('void=>*',[style({bottom:0,opacity:0}),animate('0.3s ease-in')]),
      transition('*=>void',[animate('0.3s ease',style({bottom:0,opacity:0}))])
    ]),
    fade()
  ]
})
export class LoadBtnComponent {

  @Input('state')s;

  ngOnInit() {
  }

}
