import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResultsViewPageRoutingModule } from './results-view-routing.module';

import { ResultsViewPage } from './results-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResultsViewPageRoutingModule
  ],
  declarations: [ResultsViewPage]
})
export class ResultsViewPageModule {}
