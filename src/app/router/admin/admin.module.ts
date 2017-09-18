import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';
import { MainComponent } from './main/main.component';
import {ShareModule} from 'app/selfModule/share/share.module';
import { ArticleListComponent } from './article-list/article-list.component';
import {AdminService} from './admin.service';
import { ContainerComponent } from './container/container.component';
import { ArticleComponent } from './article/article.component';
import { ReplyCardComponent } from './article/reply-card/reply-card.component';
import { DatePickComponent } from './article/date-pick/date-pick.component';
import {GuardService} from './guard.service';
import { RecommandListComponent } from './article-list/recommand-list/recommand-list.component';
import { PlateBriefComponent } from './article-list/plate-brief/plate-brief.component';
import { CoverComponent } from './article-list/cover/cover.component';

const routes=[
  { path:'',
    component:ContainerComponent,
    children:[
      {path:'',component:MainComponent},
      {path:':articles',component:ArticleListComponent},
      {path:':articles/:aId',component:ArticleComponent}
    ],
    canActivate:[GuardService]
  }
];

@NgModule({
  imports: [
    ShareModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    MainComponent,
    ArticleListComponent,
    ContainerComponent,
    ArticleComponent,
    ReplyCardComponent,
    DatePickComponent,
    RecommandListComponent,
    PlateBriefComponent,
    CoverComponent],

  providers:[
    AdminService,
    GuardService
  ]
})
export class AdminModule { }
