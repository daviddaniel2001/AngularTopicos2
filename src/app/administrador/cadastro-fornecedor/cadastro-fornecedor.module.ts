import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatTableModule} from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';

import { FornecedorListComponent } from './components/fornecedor-list/fornecedor-list.component';
import { FornecedorRoutingModule } from './cadastro-fornecedor-routing.module';
import { FornecedorFormComponent } from './components/fornecedor-form/fornecedor-form.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    FornecedorListComponent,
    FornecedorFormComponent,

  ],
  imports: [
    CommonModule,
    FornecedorRoutingModule,
    MatTableModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatPaginatorModule,
    FormsModule

  ]
})
export class FornecedorModule { }
