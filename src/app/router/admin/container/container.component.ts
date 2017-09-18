import { Component, OnInit,ViewChild} from '@angular/core';
import {AdminService} from '../admin.service';
@Component({
  selector: 'app-container',
  template: `
    <nav class="navbar bg-primary text-white border-0 mb-2 bwtween" style="position:sticky;top:60px;z-index:3;opacity:0.5;flex-flow:row;justify-content:space-between">
      <samp>admin container</samp>
      <button  (click)="_admin.isEdit=!_admin.isEdit" class="btn btn-sm" [ngClass]="{'btn-danger':!_admin.isEdit,'btn-success':_admin.isEdit}">
        {{_admin.isEdit?'Cancel Edit':'Edit'}}
       </button>
     </nav>
    <router-outlet></router-outlet>
    <ztw-modal [content]="_admin.modalContent" #modal (confirm)="_admin.modalResult($event)"></ztw-modal>
    <ztw-min-modal [(ngModel)]="_admin._throwErr"></ztw-min-modal>
    <footer-alert #myFooter [content]="footerContent"></footer-alert>
  `,
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {
  @ViewChild('modal')modal;
  @ViewChild('myFooter')myFooter;
  footerContent:any;
  constructor(
    public _admin:AdminService
  ){}
  ngAfterViewInit(){
    this._admin.modal=this.modal;
    this._admin.showFooter=function(content){
      this.footerContent=content;
      this.myFooter.show();
    }.bind(this);
  }
  ngOnInit() {
  }

}
