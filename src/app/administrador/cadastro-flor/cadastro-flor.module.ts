import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { MatPaginatorModule } from '@angular/material/paginator';

import { FormsModule } from '@angular/forms';

import { MatSelectModule } from '@angular/material/select';
import {FlorCardListComponent} from "./components/flor-card-list/flor-card-list.component";
import {FlorFormComponent} from "./components/flor-form/flor-form.component";
import {FlorListComponent} from "./components/flor-list/flor-list.component";
import {FlorRoutingModule} from "./cadastro-flor-routing.module";

@NgModule({
  declarations: [
    FlorCardListComponent,
    FlorFormComponent,
    FlorListComponent
  ],
  imports: [
    CommonModule,
    FlorRoutingModule,
    MatTableModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatPaginatorModule,
    FormsModule,
    MatInputModule,
    MatSelectModule
  ]
})
export class FlorModule { }
