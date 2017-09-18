import { NgModule } from '@angular/core';
import { NavRootComponent } from './nav-root/nav-root.component';
import {lzwService} from '../../service/util.service';
import {ShareModule} from '../share/share.module';
import {RegisterFormComponent} from '../component/register-form/register-form.component';
import {TopComponent} from '../../router/home/top/top.component';
import {HomeComponent} from '../../router/home/home/home.component';
import {UserMsnMinComponent} from '../component/user-msn-min/user-msn-min.component';
import {RouterModule} from '@angular/router';
import {RegisterComponent} from '../../router/register/register.component';
import {PlateCardComponent} from '../component/plate-card/plate-card.component';
@NgModule({
  imports: [ShareModule,RouterModule],
  declarations: [
    NavRootComponent,
    TopComponent,
    HomeComponent,
    UserMsnMinComponent,
    RegisterFormComponent,
    RegisterComponent,
    PlateCardComponent
  ],
  providers:[lzwService],
  entryComponents:[UserMsnMinComponent],
  exports:[
      NavRootComponent,
    ShareModule,
    TopComponent,
    HomeComponent,
    RegisterFormComponent,
    RegisterComponent
  ]
})
export class RootModule { }
