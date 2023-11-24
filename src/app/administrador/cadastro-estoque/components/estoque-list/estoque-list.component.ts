import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Estoque } from 'src/app/models/estoque.model';
import { EstoqueService } from 'src/app/services/estoque.service';

@Component({
  selector: 'app-estoque-list',
  templateUrl: './estoque-list.component.html',
  styleUrls: ['./estoque-list.component.css']
})
export class EstoqueListComponent implements OnInit {

  tableColumns: string[] = ['id-column', 'nome-column', 'sigla-column', 'acao-column'];
  estoques: Estoque[] = [];
  totalRegistros = 0;
  pageSize = 2;
  pagina = 0;
  filtro: string = "";

  constructor(private estoqueService: EstoqueService) {}

  ngOnInit(): void {
    this.carregarEstoques();
    this.carregarTotalRegistros();
  }

  carregarEstoques() {
    // se existe dados no filtro
    if (this.filtro) {
      this.estoqueService.findByNome(this.filtro, this.pagina, this.pageSize).subscribe(data => {
        this.estoques = data;
      });
    } else {
      // buscando todos os estoques
      this.estoqueService.findAll(this.pagina, this.pageSize).subscribe(data => {
        this.estoques = data;
      });
    }
  }

  carregarTotalRegistros() {
    // se existe dados no filtro
    if (this.filtro) {
      this.estoqueService.countByNome(this.filtro).subscribe(data => {
        this.totalRegistros = data;
      });
    } else {
      this.estoqueService.count().subscribe(data => {
        this.totalRegistros = data;
      });
    }
  }

  // Método para paginar os resultados
  paginar(event: PageEvent): void {
    this.pagina = event.pageIndex;
    this.pageSize = event.pageSize;
    this.carregarEstoques();
  }

  aplicarFiltro() {
    this.carregarEstoques();
    this.carregarTotalRegistros();
  }

}
