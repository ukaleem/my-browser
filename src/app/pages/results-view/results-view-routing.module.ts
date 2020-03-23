import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResultsViewPage } from './results-view.page';

const routes: Routes = [
  {
    path: '',
    component: ResultsViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResultsViewPageRoutingModule {}
