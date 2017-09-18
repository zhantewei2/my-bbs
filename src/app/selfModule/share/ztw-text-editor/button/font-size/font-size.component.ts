import { Component, OnInit,HostBinding} from '@angular/core';
import {parent} from '../../total.service';
@Component({
  selector: 'ztw-font-size',
  templateUrl: './font-size.component.html',
  styleUrls: ['./font-size.component.css']
})
export class FontSizeComponent implements OnInit {
  size:number=3;
  sizeArr=[1,2,3,4,5,6,7];

  @HostBinding('className')hostClass='dbBtn between';
  getSize(tp){
    this.parent.modal.getResult(tp,'fontSize',true);
  }
  setSize(i=this.size){
    document.execCommand('fontSize',false,this.size=i);
    this.parent.modal.close();
  }
  constructor(
    private parent:parent
  ) { }
  ngOnInit() {
  }

}

