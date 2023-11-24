import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { usuarioResolver } from './components/resolver/usuario-resolver';
import { UsuarioListComponent } from './components/usuarios-list/usuarios-list.component';
import { UsuarioFormComponent } from './components/usuarios-form/usuarios-form.component';

const routes: Routes = [
  { path:'list', component: UsuarioListComponent },
  { path:'new', component: UsuarioFormComponent },
  {path: 'edit/:id', component: UsuarioFormComponent, resolve: {usuario: usuarioResolver}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }