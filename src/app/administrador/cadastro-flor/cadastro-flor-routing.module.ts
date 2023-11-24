import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlorListComponent } from './components/flor-list/flor-list.component';
import { FlorFormComponent } from './components/flor-form/flor-form.component';
import { florResolver } from './resolver/flor-resolver';
import {FlorCardListComponent} from "./components/flor-card-list/flor-card-list.component";

const routes: Routes = [
  {path: 'card-list', component: FlorCardListComponent},
  {path: 'list', component: FlorListComponent},
  {path: 'new', component: FlorFormComponent},
  {path: 'edit/:id', component: FlorFormComponent, resolve: {flor: florResolver}}
];

 @NgModule({
  imports: [RouterModule.forChild(routes)],
   exports: [RouterModule] })

 export class FlorRoutingModule { }
