import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 
import { ProdutoListComponent } from './components/produto-list/produto-list.components';
import { ProdutoFormComponent } from './components/produto-form/produto-form.component';
import { produtoResolver } from './components/resolver/produto-resolver';

 const routes: Routes = [
   { path:'list', component: ProdutoListComponent },
   { path:'new', component: ProdutoFormComponent },
   { path:'edit/id', component: ProdutoFormComponent, resolve: {produto: produtoResolver}} 
 ];

 @NgModule({
  imports: [RouterModule.forChild(routes)],
   exports: [RouterModule] })
 export class ProdutoRoutingModule { }