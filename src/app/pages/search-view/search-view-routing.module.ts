import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchViewPage } from './search-view.page';

const routes: Routes = [
  {
    path: '',
    component: SearchViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchViewPageRoutingModule {}
