import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Promocao } from 'src/app/models/promocao.model';
import { PromocaoService } from 'src/app/services/promocao.service';

@Component({
  selector: 'app-promocao-list',
  templateUrl: './promocao-list.component.html',
  styleUrls: ['./promocao-list.component.css']
})
export class PromocaoListComponent implements OnInit{

  tableColumns: string[] = ['id-column', 'nomePromocao-column', 'produtoElegivel-column','desconto-column', 'dataInicio-column', 'dataTermino-column', 'acao-column'];
  promocoes: Promocao[] = [];
  totalRegistros = 0;
  pageSize = 2;
  pagina = 0;
  filtro: string = "";

  constructor(private promocaoService: PromocaoService) {}

  ngOnInit(): void {
    this.carregarPromocoes();
    this.carregarTotalRegistros();
  }

  carregarPromocoes() {
    // se existe dados no filtro
    if (this.filtro) {
      this.promocaoService.findByNome(this.filtro, this.pagina, this.pageSize).subscribe(data => {
        this.promocoes = data;
      });
    } else {
      // buscando todos os fornecedores
      this.promocaoService.findAll(this.pagina, this.pageSize).subscribe(data => {
        this.promocoes = data;
      });
    }
  }

  carregarTotalRegistros() {
    // se existe dados no filtro
    if (this.filtro) {
      this.promocaoService.countByNome(this.filtro).subscribe(data => {
        this.totalRegistros = data;
      });
    } else {
      this.promocaoService.count().subscribe(data => {
        this.totalRegistros = data;
      });
    }
  }

  // Método para paginar os resultados
  paginar(event: PageEvent): void {
    this.pagina = event.pageIndex;
    this.pageSize = event.pageSize;
    this.carregarPromocoes();
  }

  aplicarFiltro() {
    this.carregarPromocoes();
    this.carregarTotalRegistros();
  }

}
