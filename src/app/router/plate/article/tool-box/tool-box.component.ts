import { Component,OnInit,ViewChild } from '@angular/core';
import {ArticleService} from '../children/article.service';
import {width} from 'app/selfModule/animations/animate';
@Component({
  selector: 'tool-box',
  templateUrl: './tool-box.component.html',
  styleUrls: ['./tool-box.component.css'],
  animations:[width()]
})
export class ToolBoxComponent implements OnInit {

  constructor(
    private _as:ArticleService
  ){}
  @ViewChild('mydrop')myDrop;
  ngOnInit() {}
  isOpen:boolean;
  open(){
    this.isOpen=true;
    this.myDrop.open();
  }
  close(){
    this.isOpen=false;
    this.myDrop.close();
  }
  goUp(){

  }
  reply(){
    this._as.openReply();
  }
}
