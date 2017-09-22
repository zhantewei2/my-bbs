import { Component,Input,EventEmitter,Output} from '@angular/core';
@Component({
  selector: 'btn-scroll-nav',
  templateUrl: './scroll-nav.component.html',
  styleUrls: ['./scroll-nav.component.css'],
})
export class ScrollNavComponent{

  @Output('refresh')refresh:any=new EventEmitter();
  @Input('nowPage')_now;
  @Input()pages;
  @Output('select')select:any=new EventEmitter();
  @Input()set bound(val){
    if(!val)return;
    let arr=[];
    for(let i=val.up;i<=val.down;i++){
      arr.push(i);
    }
    this.btnArr=arr;
  }
  btnArr:any;
  loading:boolean;
  @Output('result')result:any=new EventEmitter();
  constructor() { }
  go=(dr)=>this.result.emit(dr);

}
