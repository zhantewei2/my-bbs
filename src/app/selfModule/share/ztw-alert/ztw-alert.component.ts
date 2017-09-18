import { Component,OnInit,Input,Output,EventEmitter} from '@angular/core';

@Component({
  selector: 'ztw-alert',
  template: `
    <div class="alert between" [ngClass]="class1" *ngIf="show">
      <span>
        <ng-content></ng-content>
      </span>
      <span (click)="show=false;close.emit(true)" class="ml-2 close" style="opacity:0.5" [ngClass]="class2">&times;</span>
    </div>
  `,
  styleUrls: ['./ztw-alert.component.css']
})
export class ZtwAlertComponent implements OnInit {
  @Input()show:boolean;
  class1:any={};
  class2:any={};
  @Output('close')close:EventEmitter<any>=new EventEmitter();
  constructor() { }
  @Input()set type(val){
    this.class1={};
    this.class2={};
    this.class1['alert-'+val]=true;
    this.class2['text-'+val]=true;
  }
  ngOnInit() {}

}
