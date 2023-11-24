import { Component, OnInit } from '@angular/core';
import { Transportadora } from 'src/app/models/transportadora.model';
import { TransportadoraService } from 'src/app/services/transportadora.service';

@Component({
  selector: 'app-transportadora-list',
  templateUrl: './transportadora-list.component.html',
  styleUrls: ['./transportadora-list.component.css']
})
export class TransportadoraListComponent implements OnInit{

  tableColumns: string[] = ['id-column', 'nome-column', 'transportadoras-column'];
  transportadoras: Transportadora[] = [];

  constructor(private transportadoraService: TransportadoraService) {}

  ngOnInit(): void {
    this.transportadoraService.findAll().subscribe(data => {
      this.transportadoras = data;
    });
  }
}
