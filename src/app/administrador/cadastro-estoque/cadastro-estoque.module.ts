import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlorRoutingModule } from '../cadastro-flor/cadastro-flor-routing.module';
import { EstoqueFormComponent } from './components/estoque-form/estoque-form.component';
import { EstoqueListComponent } from './components/estoque-list/estoque-list.component';
import { MatPaginatorModule } from '@angular/material/paginator';


@NgModule({
  declarations: [
    EstoqueFormComponent,
    EstoqueListComponent
  ],
  imports: [

    CommonModule,
    FlorRoutingModule,
    MatTableModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    RouterModule,
    MatPaginatorModule,
    FormsModule

  ]
})
export class EstoqueModule { }
