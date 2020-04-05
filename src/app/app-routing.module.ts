import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ZoneOverviewComponent } from './zone-overview/zone-overview.component';
import { ZoneEditComponent } from './zone-edit/zone-edit.component';

const routes: Routes = [
      { path: '', redirectTo: '/overview', pathMatch: 'full'},
      { path: 'overview', component: ZoneOverviewComponent},
      { path: 'edit', component: ZoneEditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
