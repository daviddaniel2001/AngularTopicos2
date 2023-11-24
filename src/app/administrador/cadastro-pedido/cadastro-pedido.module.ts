import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CadastroPedidoRoutingModule } from './cadastro-pedido-routing.module';
import { PedidoListComponent } from './components/pedido-list/pedido-list.component';
import { PedidoFormComponent } from './components/pedido-form/pedido-form.component';
import { MatTableModule } from '@angular/material/table';
import { FlorRoutingModule } from '../cadastro-flor/cadastro-flor-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PedidoListComponent,
    PedidoFormComponent
  ],
  imports: [
    CommonModule,
    CadastroPedidoRoutingModule,
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
export class CadastroPedidoModule { }
