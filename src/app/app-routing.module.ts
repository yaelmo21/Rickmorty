import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GridItemsComponent } from './components/grid-items/grid-items.component';
import { SearchComponent } from './components/search/search.component';

const routes: Routes = [
  {
    path: 'inicio', component: GridItemsComponent
  },
  {
    path: 'search/:term', component: SearchComponent
  },
  {
    path: '**', redirectTo: 'inicio'
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
