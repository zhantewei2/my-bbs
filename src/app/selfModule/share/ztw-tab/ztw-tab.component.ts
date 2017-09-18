import { Input,EventEmitter,Injectable,ContentChildren,Component,ContentChild,Output,Directive,TemplateRef} from '@angular/core';
/*
how to use it:
  <ztw-tab (selected)='' #tab>
    <ztw-tabBtn value?=1>
      <ng-template ztwTabContent></ng-template>
    </ztw-tabBtn>
  </ztw-tab>
  <button (click)='tab.selectTab(1)'> </button>
 */
//service:
@Injectable()
export class tabService{
  selectTab:any;
  nowTab:any;
}

//ztwTabContent:
@Directive({
  selector:'[ztwTabContent]'
})
export class ztwTabContent{
  constructor(public _tp:TemplateRef<any>){}
}
//ztw-tabBtn:
@Component({
  selector:'ztw-tabBtn',
  template:'<ng-content></ng-content>',
  host:{
    '(click)':'!prevent&&ts.selectTab(select0)',
    'class':'tab-btn',
    '[class.active]':'ts.nowTab==select0'
  }
})
export class ztwTabBtn{
  @Input()set value(val){this.select0=val};
  @Input()prevent;
  select0=this;
  constructor(private ts:tabService){}
  @ContentChild(ztwTabContent)control;
}

//ztw-tab:
@Component({
  selector: 'ztw-tab',
  template: `
    <div class="tab-nav" ><ng-content></ng-content></div>
    <div class="tab-bg"><ng-container [innerTemplate]="tp"></ng-container><div>
      `,
  styleUrls: ['./ztw-tab.component.css'],
  providers:[tabService]
})
export class ZtwTabComponent {
  constructor(public ts:tabService){}
  @Output('selected')selected:EventEmitter<any>=new EventEmitter();
  @ContentChildren(ztwTabBtn)children;
  ngAfterViewInit(){
    this.init();
    this.ts.selectTab=this.selectTab.bind(this);
    this.children.changes.subscribe(v=>this.init());
  }
  init(){
    setTimeout(()=>{this.selectTab(this.children._results[0].select0)},1)
  }
  tp:TemplateRef<any>;
  selectTab(select0){
    this.tp=this.children._results.find(v=>v.select0==select0).control._tp;
    this.ts.nowTab=select0;
    this.selected.emit(select0);
  }
}



