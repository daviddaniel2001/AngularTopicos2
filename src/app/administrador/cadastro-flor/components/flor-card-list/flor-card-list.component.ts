import { Component, OnInit, Signal, signal } from '@angular/core';
import { Flor } from 'src/app/models/flor.model';
import { FlorService } from 'src/app/services/flor.service';
import {MatSnackBar} from "@angular/material/snack-bar";
import {CarrinhoService} from "../../../../services/carrinho.service";

type Card = {
  idFlor: number;
  titulo: string;
  preco: number;
  corPetalas: string
  tipoFlor: string;
  urlImagem: string;
}

@Component({
  selector: 'app-flor-card-list',
  templateUrl: './flor-card-list.component.html',
  styleUrls: ['./flor-card-list.component.css']
})
export class FlorCardListComponent implements OnInit {

  cards = signal<Card[]> ([]);
  flores: Flor[] = [];

  constructor(private florService: FlorService,
              private carrinhoService: CarrinhoService,
              private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.carregarFlores();
  }

  carregarFlores() {
    // buscando todos as flores
    this.florService.findAll(0, 10).subscribe(data => {
      this.flores = data;
      this.carregarCards();
    });
  }

  carregarCards() {
    const cards: Card[] = [];
    this.flores.forEach(flor => {
      cards.push({
        idFlor: flor.id,
        titulo: flor.descricao,
        preco: flor.preco,
        corPetalas: flor.corPetalas,
        tipoFlor: flor.tipoFlor.label,
        urlImagem: this.florService.getUrlImagem(flor.nomeImagem),
      });
    });
    this.cards.set(cards);
  }

  adicionarAoCarrinho(card: Card) {
    this.showSnackbarTopPosition('Produto adicionado ao carrinho!', 'Fechar');
    this.carrinhoService.adicionar({
      id: card.idFlor,
      nome: card.titulo,
      preco: card.preco,
      quantidade: 1
    })

  }

  showSnackbarTopPosition(content:any, action:any) {
    this.snackBar.open(content, action, {
      duration: 2000,
      verticalPosition: "top", // Allowed values are  'top' | 'bottom'
      horizontalPosition: "center" // Allowed values are 'start' | 'center' | 'end' | 'left' | 'right'
    });
  }


}
