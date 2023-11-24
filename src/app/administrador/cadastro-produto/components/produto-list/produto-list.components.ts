import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Produto } from 'src/app/models/produto.model';
import { ProdutoService } from 'src/app/services/produto.service';


@Component({
  selector: 'app-produto-list',
  templateUrl: './produto-list.component.html',
  styleUrls: ['./produto-list.component.css']
})

export class ProdutoListComponent implements OnInit {
  formGroup = FormGroup;
  
  tableColumns: string[] = ['id-column', 'nome-column', 'descricao-column', 'valoUnidade-column', 'nomeImagem-column', 'quantEstoque-colomn'];
  produtos: Produto[] = [];

  constructor(private produtoService: ProdutoService) {}

  ngOnInit(): void {
    this.produtoService.findAll().subscribe(data => {
      this.produtos = data;
    });
  }

  
}
