import { Component, OnInit ,Input ,ViewChild,ViewContainerRef} from '@angular/core';
import {slideRightToggle,fadeToggle} from '../../animations/animate';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css'],
  animations:[slideRightToggle(),fadeToggle()]
})
export class SideNavComponent implements OnInit {
  slide:string='hidden';
  prevent:boolean=false;
  @Input('width')contentWidth:number;
  @Input('tp')tp:any;
  @ViewChild('container',{read:ViewContainerRef})container;
  constructor() { }

  open(){
    if(this.prevent||this.slide=='show')return;
    this.prevent=true;
    this.slide='show';
    this.container.createEmbeddedView(this.tp);
  }
  close(){
    if(this.prevent||this.slide!='show')return;
    this.prevent=true;
    this.slide='hidden';
  }
  toggle(){
    this.slide=='show'?this.close():this.open();
  }
  ngOnInit() {
  }
  sideDown(){
    if(this.slide=='hidden')this.container.clear();
    this.prevent=false;
  }

}
