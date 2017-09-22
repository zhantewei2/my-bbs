import { Component, OnInit ,Input,Output,EventEmitter} from '@angular/core';

@Component({
  selector: 'user-card',
  templateUrl: './user-card.component.html',
  styles:['img{width:6rem;height:6rem}']
})
export class UserCardComponent implements OnInit {
  putImg=(window as any).myCommon.putImg;
  @Input('user')user:any;
  @Output('hostClick')hostClick:any=new EventEmitter();
  constructor() { }

  ngOnInit() {}

}
