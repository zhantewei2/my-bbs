
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {HttpModule} from '@angular/http';
import { AppComponent} from './app.component';
import {RoutingModule} from './router/router.module';
import {ZTWScrollModule} from 'ztw-angular-scroll/ztw-scroll.module';
import {HttpService} from './service/http.service';
import {RootModule} from './selfModule/root/root.module';
import {TotalService} from './service/total.service';
import {DataBaseService} from './service/data-base.service';
import {RouterService} from './service/router.service';
import {UserService} from './service/user.service';
import {TempDBService} from './service/tempDB/temp-db.service';
import {ResizeService} from './service/resize.service';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
      HttpModule,
      RoutingModule,
      BrowserAnimationsModule,
      ZTWScrollModule,
      RootModule
  ],
  providers:[
      TotalService,
      HttpService,
      DataBaseService,
      RouterService,
      UserService,
      ResizeService,
      TempDBService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
