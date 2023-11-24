import { Component, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-administrador',
  templateUrl:'./administrador.component.html',
  styleUrls: ['./administrador.component.css']
})

export class AdministradorComponent {
  formGroup = FormGroup;


}
