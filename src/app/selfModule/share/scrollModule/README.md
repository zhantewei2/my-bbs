

app.module:

	import {ZTWScrollModule} from './ztw-scroll.module';
	imports:[ZTWScrollModule];

use it as follow:	
component:

	<ztwScroll [(ngModel)]='scrollValue'>
	<div  ztwScrollControl='1'>one</div>
	<div  ztwScrollControl='2'>two</div>	
	<div  ztwScrollControl='3'>three</div>
	</ztwScroll>
	<p>{{scrollValue}}</p>
	<button (click)='scrollValue='2''> ScrollTo</button>

when body.scrollTop scrolled control,you can get `scrollValue` that the value of control.value;

set `scrollValue`，will touch scrollTo();
***

	<ztwScroll [baseLine]='50' [(ngModel)]='scrollValue'>
If you want scrolled your navBar which is fixed on the top,you can set `baseLine`;

***


	<ztwScroll [(ngModel)]='scrollValue'>
		<div ztwScrollControl='1'> two</div>
		<div ztwScrollControl='2' [useEntry]='true' (entry)='entry($event)' >one </div>
	</ztwScroll>
	
	entry(value:string = 'upIn' | 'upOut' | 'belowIn' | 'belowOut'){}



***
	
