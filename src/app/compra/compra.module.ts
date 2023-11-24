import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CarrinhoComponent } from './components/carrinho/carrinho.component';
import { CompraRoutingModule } from './compra-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    CarrinhoComponent
  ],
  imports: [
    CommonModule,
    CompraRoutingModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule
  ]
})
export class CompraModule { }
