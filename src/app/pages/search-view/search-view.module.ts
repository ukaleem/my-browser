import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchViewPageRoutingModule } from './search-view-routing.module';

import { SearchViewPage } from './search-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchViewPageRoutingModule
  ],
  declarations: [SearchViewPage]
})
export class SearchViewPageModule {}
