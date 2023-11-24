import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PromocaoListComponent } from './components/promocao-list/promocao-list.component';
import { PromocaoFormComponent } from './components/promocao-form/promocao-form.component';
import { promocaoResolver } from './resolver/promocaoResolver';

 const routes: Routes = [
   { path:'list', component: PromocaoListComponent },
   { path:'new', component: PromocaoFormComponent },
   { path:'edit/id', component: PromocaoFormComponent, resolve: {promocao: promocaoResolver}}
 ];

 @NgModule({
  imports: [RouterModule.forChild(routes)],
   exports: [RouterModule] })
 export class PromocaoRoutingModule { }
