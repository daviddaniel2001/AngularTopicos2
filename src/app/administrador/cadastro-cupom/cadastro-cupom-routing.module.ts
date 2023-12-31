import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CupomListComponent } from './components/cupom-list/cupom-list.component';
import { CupomFormComponent } from './components/cupom-form/cupom-form.component';
import { cupomResolver } from './components/resolver/cupom-resolver';

 const routes: Routes = [
   { path:'list', component: CupomListComponent },
   { path:'new', component: CupomFormComponent },
   { path:'edit/id', component: CupomFormComponent, resolve: {cupom: cupomResolver}}
 ];

 @NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule] })

 export class CupomRoutingModule { }
