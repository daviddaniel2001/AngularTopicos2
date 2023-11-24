import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


import {MatTableModule} from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { UsuarioFormComponent } from './components/usuarios-form/usuarios-form.component';
import { UsuarioListComponent } from './components/usuarios-list/usuarios-list.component';
import {NgFor} from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import { UsuarioRoutingModule } from './cadastro-usuarios-routing.module';


@NgModule({
  declarations: [
    UsuarioFormComponent,
    UsuarioListComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    RouterModule,
    MatSelectModule,
    UsuarioRoutingModule

  ]
})
export class UsuarioModule {
 }
