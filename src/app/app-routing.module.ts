import { AuthGuard } from './auth.guard';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TableComponent } from './table/table.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'View', component: TableComponent ,canActivate: [AuthGuard]},
  { path: '**', redirectTo: '/' 
    

},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
