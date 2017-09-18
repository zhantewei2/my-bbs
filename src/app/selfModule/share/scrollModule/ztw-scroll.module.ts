import {NgModule} from '@angular/core';
import {ScrollBindDirective} from './scrollBind.directive';
import {ScrollComponent} from './scroll.component';

@NgModule({
	declarations:[
		ScrollBindDirective,
    ScrollComponent
	],
  imports:[],
	exports:[
		ScrollComponent,
		ScrollBindDirective
	]
})
export class ZTWScrollModule{
}
