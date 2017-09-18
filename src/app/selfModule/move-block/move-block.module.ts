import { NgModule ,ModuleWithProviders} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoveBlockComponent } from './move-block/move-block.component';
import { BlockControlDirective } from './block-control.directive';
import {MoveBlockService} from './move-block.service'
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [MoveBlockComponent, BlockControlDirective],
  exports:[BlockControlDirective,MoveBlockComponent]
})
export class MoveBlockModule {
  static forRoot():ModuleWithProviders{
      return {
        ngModule:MoveBlockModule,
        providers:[MoveBlockService]
      }
  }

}
