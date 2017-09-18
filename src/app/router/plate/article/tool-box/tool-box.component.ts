import { Component,OnInit } from '@angular/core';
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

  ngOnInit() {}

  goUp(){

  }
  reply(){
    this._as.openReply();
  }
}
