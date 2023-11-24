import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { TransportadoraListComponent } from './components/transportadora-list/transportadora-list.component';
import { TransportadoraFormComponent } from './components/transportadora-form/transportadora-form.component';
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlorRoutingModule } from '../cadastro-flor/cadastro-flor-routing.module';


@NgModule({
  declarations: [
    TransportadoraFormComponent,
    TransportadoraListComponent
   
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
    RouterModule
    
  ]
})
export class TransportadoraModule { }
