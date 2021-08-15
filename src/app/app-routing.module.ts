import { TestAreaComponent } from './components/test-area/test-area.component';
import { PlaceholderComponent } from './components/placeholder/placeholder.component';
import { TestsListComponent } from './components/tests-list/tests-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'testsList', component: TestsListComponent, children: [
    {path: ':id', component: TestsListComponent},
  ]},
  {path: '', component: PlaceholderComponent},
  {path: ':categoryName', component: TestAreaComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
