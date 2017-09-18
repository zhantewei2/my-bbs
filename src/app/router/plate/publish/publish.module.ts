import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {ShareModule} from 'app/selfModule/share/share.module';
import {PublishComponent} from './publish.component';
import {GetCgRgResolve} from '../get-cg-rg.service';
import { StrategyComponent } from './strategy/strategy.component';
@NgModule({
  imports: [
    CommonModule,
    ShareModule,
    RouterModule.forChild([
      {path:'',component:PublishComponent,resolve:{data:GetCgRgResolve}}
    ])
  ],
  declarations: [
    PublishComponent,
    StrategyComponent
  ]
})
export class PublishModule { }
