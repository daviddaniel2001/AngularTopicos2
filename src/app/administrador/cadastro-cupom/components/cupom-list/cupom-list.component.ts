import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { Cupom } from 'src/app/models/cupom.model';
import { CupomService } from 'src/app/services/cupom.service';

@Component({
  selector: 'app-cupom-list',
  templateUrl: './cupom-list.component.html',
  styleUrls: ['./cupom-list.component.css']
})

export class CupomListComponent implements OnInit {

  tableColumns: string[] = ['id-column', 'codigo-column', 'porcetagem-column','ativo-column', 'validade-column', 'acao-column'];
  cupom: Cupom[] = [];
  totalRegistros = 0;
  pageSize = 2;
  pagina = 0;
  filtro: string = "";

  constructor(private cupomService: CupomService) {}

  ngOnInit(): void {
    this.carregarCupons();
    this.carregarTotalRegistros();
  }

  carregarCupons() {
    if (this.filtro) {
      this.cupomService.findByNome(this.filtro, this.pagina, this.pageSize).subscribe(data => {
        this.cupom = data;
      });
    } else {
      // buscando todos os estados
      this.cupomService.findAll(this.pagina, this.pageSize).subscribe(data => {
        this.cupom = data;
      });
    }
  }

  carregarTotalRegistros() {
    // se existe dados no filtro
    if (this.filtro) {
      this.cupomService.countByNome(this.filtro).subscribe(data => {
        this.totalRegistros = data;
      });
    } else {
      this.cupomService.count().subscribe(data => {
        this.totalRegistros = data;
      });
    }
  }

  // Método para paginar os resultados
  paginar(event: PageEvent): void {
    this.pagina = event.pageIndex;
    this.pageSize = event.pageSize;
    this.carregarCupons();
  }

  aplicarFiltro() {
    this.carregarCupons();
    this.carregarTotalRegistros();
  }

}

