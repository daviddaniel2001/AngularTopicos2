import { Component} from '@angular/core';
import { Flor } from 'src/app/models/flor.model';
import { FlorService } from 'src/app/services/flor.service';
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-flor-list',
  templateUrl: './flor-list.component.html',
  styleUrls: ['./flor-list.component.css']
})

export class FlorListComponent {
  tableColumns: string[] = ['id-column','descricao-column','preco-column','corPetalas-column', 'nomeImagem-column'];
  flores: Flor[] = [];
  totalRegistros = 0;
  pageSize = 10;
  pagina = 0;
  filtro: string = "";
  constructor(private florService: FlorService) {}

  ngOnInit(): void {
    this.carregarFlores();
    this.carregarTotalRegistros();
  }

  carregarFlores() {
    // se existe dados no filtro
    if (this.filtro) {
      this.florService.findByNome(this.filtro, this.pagina, this.pageSize).subscribe(data => {
        this.flores = data;
      });
    } else {
      // buscando todas as flores
      this.florService.findAll(this.pagina, this.pageSize).subscribe(data => {
        this.flores = data;
      });
    }
  }

  carregarTotalRegistros() {
    // se existe dados no filtro
    if (this.filtro) {
      this.florService.countByNome(this.filtro).subscribe(data => {
        this.totalRegistros = data;
      });
    } else {
      this.florService.count().subscribe(data => {
        this.totalRegistros = data;
      });
    }
  }

  // Método para paginar os resultados
  paginar(event: PageEvent): void {
    this.pagina = event.pageIndex;
    this.pageSize = event.pageSize;
    this.carregarFlores();
  }

  aplicarFiltro() {
    this.carregarFlores();
    this.carregarTotalRegistros();
  }
}
