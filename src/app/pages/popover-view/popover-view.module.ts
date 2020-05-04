import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PopoverViewComponent } from './popover-view.component';
import { PopoverViewComponentRoutingModule } from './popover-view-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PopoverViewComponentRoutingModule
  ],
  declarations: [PopoverViewComponent]
})
export class PopoverViewComponentModule { }
