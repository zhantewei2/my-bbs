import { Component, OnInit,ContentChildren,Input,Output,EventEmitter,forwardRef} from '@angular/core';
import {BlockControlDirective} from '../block-control.directive';
import {MoveBlockService,ztwDragParent} from '../move-block.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
@Component({
  selector: 'ztw-drag-card',
  template: `<ng-content></ng-content>`,
  styleUrls: ['./move-block.component.css'],
  providers:[{provide:ztwDragParent,useExisting:forwardRef(()=>MoveBlockComponent)}]
})
export class MoveBlockComponent implements OnInit {
  @ContentChildren(BlockControlDirective)controls;
  resizeOb:Observable<any>=Observable.fromEvent(window,'resize').debounceTime(500);
  resizeSub:any;
  floatSub:any;
  dragSub:any;
  @Output('floatIndex')float:EventEmitter<number>=new EventEmitter();
  @Output('dragIndex')dragIndex:EventEmitter<number>=new EventEmitter();
  @Input('duration')duration=500;
  @Input('bindArr')dataArr;
  @Input('disabledDrag')disabled:boolean=false;
  @Output('dragOnce')dragOnce:EventEmitter<boolean>=new EventEmitter();
  constructor(
      public _mbs:MoveBlockService
  ) { }
  ngOnInit() {
  }
  ngAfterViewInit(){
    this._mbs.controls=this.controls['_results'];
    this.cal();
    if(this.resizeSub)return;
    this.resizeSub=this.resizeOb.subscribe(v=>this.cal());
    this.floatSub=this._mbs.floatSubject.distinctUntilChanged().subscribe((v:number)=>{
      this.float.emit(v);
    });
  }
  cal(){
    let index0=0;
    this.controls.map(control=>{
      control.index=index0++;
      let node=control._el.nativeElement;
      control.top=this._mbs.getAbsoluteTop(node);
      control.left=this._mbs.getRectLeft(node);

    })
  }
  ngOnDestory(){
    this.resizeSub.unsubscribe();
    this.resizeSub=null;
    this.floatSub.unsubscribe();
  }
}
