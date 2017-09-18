import { NgModule } from '@angular/core';
import { SelfNtfComponent,ntfListComponent } from './self-ntf/self-ntf.component';
import {RouterModule} from '@angular/router';
import {ShareModule} from '../../selfModule/share/share.module';
@NgModule({
  imports: [
    ShareModule,
    RouterModule.forChild([
      {path:'',component:SelfNtfComponent}
    ])
  ],
  declarations: [SelfNtfComponent,ntfListComponent]
})
export class NtfModule { }
