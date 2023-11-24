import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 
import { TransportadoraFormComponent } from './components/transportadora-form/transportadora-form.component';
import { TransportadoraListComponent } from './components/transportadora-list/transportadora-list.component';
import { transportadoraResolver } from './resolver/transportadora-resolver';

 const routes: Routes = [
   { path:'list', component: TransportadoraListComponent },
   { path:'new', component: TransportadoraFormComponent },
   { path:'edit/id', component: TransportadoraFormComponent, resolve: {transportadora: transportadoraResolver}} 
 ];

 @NgModule({
  imports: [RouterModule.forChild(routes)],
   exports: [RouterModule] })
 export class TransportadoraRoutingModule { }