import { Component,ViewChild} from '@angular/core';
import {HttpService} from './service/http.service';
import {TotalService} from './service/total.service';
import {RouterService} from './service/router.service';
import {HomeComponent} from './router/home/home/home.component';
import {RemindService} from './service/remind.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[RemindService]
})
export class AppComponent {
  constructor(
      public http:HttpService,
      public _ts:TotalService,
      public _rs:RouterService,
      public _remind:RemindService
  ){}
  @ViewChild('slideNav')slideNav;
  ngAfterViewInit(){
    this._ts.alert=function(val){
      this.footerContent=val;
      this.footer.show();
    }.bind(this);
    this._ts.modal=function(content,result?,isLg?){
      this.modalContent=content;
      if(result)this.modalResult=result;
      if(isLg)this.isLg=isLg;
      this.myModal.open();
    }.bind(this);
    this._ts.closeModal=function(){this.myModal.close()}.bind(this);
  }
  entry=(e)=>this._rs.isHome=e instanceof HomeComponent;
  popup=(e)=>this._remind.activated=true;
  @ViewChild('footer')footer;
  footerContent:any;
  @ViewChild('myModal')myModal;
  modalContent:any;
  isLg:boolean;
  modalResult=(e)=>{};
}
