import { Component, OnInit,Input } from '@angular/core';
import { slideTopToggle} from 'app/selfModule/animations/animate';
@Component({
  selector: 'footer-alert',
  templateUrl: './footer-alert.component.html',
  styleUrls: ['./footer-alert.component.css'],
  animations:[slideTopToggle()]
})
export class FooterAlertComponent implements OnInit {
  timeOut:any;
  @Input()closeTime=2000;
  @Input()content='none';
  @Input()type:string='success';
  show(){
    if(this.showAlert)return;
    if(this.timeOut)clearTimeout(this.timeOut);
    this.timeOut=setTimeout(()=>{this.close()},this.closeTime);
    this.showAlert=true;
  }
  close(){
    if(this.timeOut){
      clearTimeout(this.timeOut);
      this.timeOut=null;
    }
    this.showAlert=false;
  }
  toggle(){
    this.showAlert?this.close():this.show();
  }
  showAlert:boolean=false;
  constructor() { }

  ngOnInit() {
  }

}
