import { Component,HostBinding,ViewChild} from '@angular/core';

import {parent} from '../../total.service';
import {fontColor} from '../../animate/animate';

@Component({
  selector: 'ztw-font-color',
  templateUrl: './font-color.component.html',
  styleUrls: ['./font-color.component.css'],
  animations:[fontColor('0.5s ease-in-out')]
})
export class FontColorComponent {
  color:string='black';
  colorAn:string='normal';
  @ViewChild('palette')palette;
  constructor(
    private parent:parent
  ) { }
  @HostBinding('className')hostClass='between dbBtn';
  selectColor(colorTp){
    this.parent.modal.getResult(colorTp,'palette',true);
    setTimeout(()=>{
      let container=this.createContainer();
      document.getElementById('ztw-textEdit-color').appendChild(container);
    },1)
  }
  setColor=()=>document.execCommand('foreColor',true,this.color);
  click(e){
    let node=e.target;
    if(node.nodeName=='SPAN'){
      this.color=node.style.background;
      this.colorAn='change';
      this.parent.modal.close();
      setTimeout(()=>{this.setColor()},1);
    }
  }
  cacheFragment:any;
  createContainer(){
    let size=3,rowC=7,total=0,per=255/(size-1),node,container;
    if(this.cacheFragment){
      container=this.cacheFragment;
    }else {
      let fragment = document.createDocumentFragment();
      for (let x = 0; x < size; x++) {
        for (let y = 0; y < size; y++) {
          for (let z = 0; z < size; z++) {
            node = document.createElement('span');
            node.style.background=`rgb(${Math.ceil(per * x)},${Math.ceil(per * y)},${Math.ceil(per * z)})`;
            node.className='colorBlock';
            fragment.appendChild(node);
            total++;
            if (total != 1 && total % rowC == 0) fragment.appendChild(document.createElement('br'));
          }
        }
      }
      container=document.createElement('div');
      container.appendChild(fragment);
      this.cacheFragment=container;
    }
    return container;
  }
}
