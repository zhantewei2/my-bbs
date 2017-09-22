import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlateComponent } from './plate/plate.component';
import {RouterModule} from '@angular/router';
import {ShareModule} from 'app/selfModule/share/share.module';
import {GetCgRgResolve} from './get-cg-rg.service';
import {userCanLoad} from 'app/service/guard.service';
import { ArticleComponent } from './article/article.component';
import { PlateUserCardComponent } from './plate-user-card/plate-user-card.component';
import { RelyComponent } from './article/children/rely/rely.component';
import {ToolBoxComponent} from './article/tool-box/tool-box.component';
import { TitleNavComponent } from './article/children/title-nav/title-nav.component';
import { NavPageComponent } from './article/children/nav-page/nav-page.component';
import { LoadBtnComponent } from './article/children/load-btn/load-btn.component';

import { InnerReplyComponent } from './article/children/inner-reply/inner-reply.component';
import { ViewReply2Component } from './article/children/view-reply2/view-reply2.component';
import { VoteComponent } from './article/children/vote/vote.component';
import { ArticleStrategyComponent } from './article/children/article-strategy/article-strategy.component';
import { ScrollNavComponent } from './scroll-nav/scroll-nav.component';
let routes=[
  {
    path:':id/publish',
    loadChildren:'./publish/publish.module#PublishModule',
    canLoad:[userCanLoad]
  },
  {
    path:':id/:aId',
    component:ArticleComponent,
    resolve:{
      data:GetCgRgResolve
    }
  },
  {
    path:':id',
    component:PlateComponent,
    resolve:{data:GetCgRgResolve}
  },
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ShareModule
  ],
  declarations: [
    PlateComponent,
    ArticleComponent,
    PlateUserCardComponent,
    RelyComponent,
    ToolBoxComponent,
    TitleNavComponent,
    NavPageComponent,
    LoadBtnComponent,
    InnerReplyComponent,
    ViewReply2Component,
    VoteComponent,
    ArticleStrategyComponent,
    ScrollNavComponent
  ],
  entryComponents:[InnerReplyComponent],
  providers:[GetCgRgResolve]
})
export class PlateModule { }
