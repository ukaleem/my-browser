import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'search-view',
    loadChildren: () => import('./pages/search-view/search-view.module').then( m => m.SearchViewPageModule)
  },
  {
    path: 'results-view',
    loadChildren: () => import('./pages/results-view/results-view.module').then( m => m.ResultsViewPageModule)
  },
  {
    path: 'results-view/:text',
    loadChildren: () => import('./pages/results-view/results-view.module').then( m => m.ResultsViewPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
