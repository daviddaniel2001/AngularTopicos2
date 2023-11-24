import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { PromocaoFormComponent } from './components/promocao-form/promocao-form.component';
import { PromocaoRoutingModule } from './cadastro-promocao-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { PromocaoListComponent } from './components/promocao-list/promocao-list.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PromocaoFormComponent,
    PromocaoListComponent

  ],
  imports: [
    CommonModule,
    PromocaoRoutingModule,
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
export class PromocaoModule { }
