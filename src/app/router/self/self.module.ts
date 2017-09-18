import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user/user.component';
import { RouterModule} from '@angular/router';
import { ShareModule} from 'app/selfModule/share/share.module';
import { SelectImgComponent } from './select-img/select-img.component';
import { SelectImg0Component } from './select-img-0/select-img-0.component';
import { PublishStatisticsComponent } from './publish-statistics/publish-statistics.component';
const routes:any=[
  {path:'',component:UserComponent,pathMatch:'full'}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ShareModule
  ],
  entryComponents:[SelectImg0Component],
  declarations: [UserComponent, SelectImgComponent, SelectImg0Component, PublishStatisticsComponent]
})
export class SelfModule { }
