import { NgModule ,Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule} from '@angular/router';
import {HomeComponent} from './home/home/home.component';
import { RegisterComponent } from './register/register.component';
import {userCanLoad} from '../service/guard.service';
import { ErrComponent } from './home/err/err.component';
@Component({
  template:`<router-outlet></router-outlet>`
})
export class proxyComponent{

}

let routing:any=[
  {
    path:'',component:HomeComponent
  },
  {
    path:'err',component:ErrComponent
  },
  {
    path:'ntf',outlet:'popup',
    component:proxyComponent,
    children:[
      {path:'',loadChildren:'./ntf/ntf.module#NtfModule'}
    ]
  },
  {
    path:'plates',
    loadChildren:'./plate/plate.module#PlateModule'
  },
  {
    path:'register',component:RegisterComponent
  },
  {
    path:'user',
    loadChildren:'./self/self.module#SelfModule'
  },
  {
    path:'admin6',
    loadChildren:'./admin/admin.module#AdminModule'
  }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routing)
  ],
  declarations: [proxyComponent],
  exports:[
    RouterModule,
    proxyComponent
  ],
  providers:[userCanLoad]
})
export class RoutingModule { }


