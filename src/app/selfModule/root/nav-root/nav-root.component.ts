import { Component,ViewContainerRef,ViewChild,ComponentRef,ElementRef} from '@angular/core';
import { Router,ActivatedRoute} from '@angular/router';
import {TotalService} from 'app/service/total.service';
import {RouterService} from 'app/service/router.service';
import {ResizeService} from 'app/service/resize.service';
import {slideTopToggle} from '../../animations/animate';
import {RemindService} from 'app/service/remind.service';
@Component({
  selector: 'nav-root',
  templateUrl: './nav-root.component.html',
  styleUrls: ['./nav-root.component.css'],
  animations:[slideTopToggle('0.5s ease',{transform:'translateY(-100%)',opacity:0})]
})
export class NavRootComponent {
  constructor(
      public _ts:TotalService,
      public _rs:RouterService,
      private _el:ElementRef,
      public _res:ResizeService,
      private router:Router,
      private route:ActivatedRoute,
      public _remind:RemindService
  ) {this.user=_ts.userMsn}
  @ViewChild('sideNav')sideNav;
  @ViewChild('nav')nav;
  user:any;
  ngAfterViewInit(){
    this._rs.openLogin=()=>this.sideNav.open.call(this.sideNav);
    let nav=this._rs.nav;
    nav.height=this._el.nativeElement.offsetHeight;
    nav.node=this.nav.nativeElement;
    nav.sideNav=this.sideNav.toggle.bind(this.sideNav);
    nav.close=this.sideNav.close.bind(this.sideNav);
  }
}
