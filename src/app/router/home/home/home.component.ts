import { Component} from '@angular/core';
import {TotalService} from 'app/service/total.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent{
  object:any=Object;
  constructor(
      public _ts:TotalService
  ) { }
  ngOnInit() {
  }

}
