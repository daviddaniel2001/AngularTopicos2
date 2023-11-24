import { PedidoService } from 'src/app/services/pedido.service';
import { Pedido } from './../../../../models/pedido.model';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-pedido-list',
  templateUrl: './pedido-list.component.html',
  styleUrls: ['./pedido-list.component.css']
})
export class PedidoListComponent implements OnInit{

  //arrumar as colunas >>>
  tableColumns: string[] = ['id-column', 'nomePedido-column', 'produtoElegivel-column','desconto-column', 'dataInicio-column', 'dataTermino-column', 'acao-column'];
  pedido: Pedido[] = [];
  totalRegistros = 0;
  pageSize = 2;
  pagina = 0;
  filtro: string = "";

  constructor(private pedidoService: PedidoService) {}

  ngOnInit(): void {
    this.carregarPedido();
    this.carregarTotalRegistros();
  }

  carregarPedido() {
    // se existe dados no filtro
    if (this.filtro) {
      this.pedidoService.findByNome(this.filtro, this.pagina, this.pageSize).subscribe(data => {
        this.pedido = data;
      });
    } else {
      // buscando todos os pedidos
      this.pedidoService.findAll(this.pagina, this.pageSize).subscribe(data => {
        this.pedido = data;
      });
    }
  }

  carregarTotalRegistros() {
    // se existe dados no filtro
    if (this.filtro) {
      this.pedidoService.countByNome(this.filtro).subscribe(data => {
        this.totalRegistros = data;
      });
    } else {
      this.pedidoService.count().subscribe(data => {
        this.totalRegistros = data;
      });
    }
  }

  // Método para paginar os resultados
  paginar(event: PageEvent): void {
    this.pagina = event.pageIndex;
    this.pageSize = event.pageSize;
    this.carregarPedido();
  }

  aplicarFiltro() {
    this.carregarPedido();
    this.carregarTotalRegistros();
  }

}
