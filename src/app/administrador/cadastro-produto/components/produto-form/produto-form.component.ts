import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Produto } from 'src/app/models/produto.model';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-flor-form',
  templateUrl: './produto-form.component.html',
  styleUrls: ['./produto-form.component.css']
})

export class ProdutoFormComponent implements OnInit{
  formGroup: FormGroup;
  apiResponse: any = null;

  constructor(private formBuilder: FormBuilder,
              private produtoService: ProdutoService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {

    const produto: Produto = this.activatedRoute.snapshot.data['produto'];

    this.formGroup = formBuilder.group({
      id:[(produto && produto.id) ? produto.id : null],
      nome:[(produto && produto.nome) ? produto.nome : '', Validators.required],
      descricao:[(produto && produto.descricao) ? produto.descricao : '', Validators.required],
      valorUnidade:[(produto && produto.valorUnidade) ? produto.valorUnidade: '', Validators.required],
      nomeImagem:[(produto && produto.nomeImagem) ? produto.nomeImagem : '', Validators.required],
      quantEstoque:[(produto && produto.quantEstoque) ? produto.quantEstoque : '', Validators.required]

    })
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  salvar() {
    if (this.formGroup.valid) {
      const produto = this.formGroup.value;
      if (produto.id == null) {
        this.produtoService.save(produto).subscribe({
          next: (produtoCadastrado) => {
            this.router.navigateByUrl('/produtos/list');
          },
          error: (errorResponse) => {
           this.apiResponse = errorResponse.error;

           this.formGroup.get('nome')?.setErrors({ apiError: this.getErrorMessage('nome') });
           this.formGroup.get('descricao')?.setErrors({ apiError: this.getErrorMessage('descricao') });
           this.formGroup.get('valorUnidade')?.setErrors({ apiError: this.getErrorMessage('valorUnidade') });
           this.formGroup.get('nomeImagem')?.setErrors({ apiError: this.getErrorMessage('nomeImagem') });
           this.formGroup.get('quantEstoque')?.setErrors({ apiError: this.getErrorMessage('quantEstoque') });

           console.log('Erro ao incluir' + JSON.stringify(errorResponse));
         }
       });

      } else {
        this.produtoService.update(produto).subscribe({
          next: (produtoCadastrado) => {
            this.router.navigateByUrl('/produtos/list');
          },
          error: (err) => {
            console.log('Erro ao alterar' + JSON.stringify(err));
          },
        });
      }
    }
  }

  getErrorMessage(fieldName: string): string {
    const error = this.apiResponse.errors.find((error: any) => error.fieldName === fieldName);
    return error ? error.message : '';
  }

  excluir() {
    const produto = this.formGroup.value;
    if (produto.id != null) {
      this.produtoService.delete(produto).subscribe({
        next: (e) => {
          this.router.navigateByUrl('/produto/list');
        },
        error: (err) => {
          console.log('Erro ao excluir' + JSON.stringify(err));
        }
      });
    }
  }

}
