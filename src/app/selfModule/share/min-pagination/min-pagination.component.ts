import { Component,Input,Output,EventEmitter} from '@angular/core';
export interface Result{
  page:number;
  dr:string;
}
@Component({
  selector: 'min-pagination',
  templateUrl: './min-pagination.component.html',
  styleUrls: ['./min-pagination.component.css']
})
export class MinPaginationComponent  {
  @Input()preventEnd:boolean;
  @Input()pages;
  @Input()set nowPage(val){
    if(!val)return;
    this.loading=false;
    this._nowPage=val;
  };
  loading:boolean=false;
  _nowPage:number;
  @Output('result')result:EventEmitter<Result>=new EventEmitter();
  constructor() { }
  select=(page,dr)=>{
    if(page==this._nowPage)return;
    this.loading=true;
    this.result.next({page:page,dr:dr})
  }
}
