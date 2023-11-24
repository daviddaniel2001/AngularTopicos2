import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Estoque } from 'src/app/models/estoque.model';
import { EstoqueService } from 'src/app/services/estoque.service';

@Component({
  selector: 'app-estoque-form',
  templateUrl: './estoque-form.component.html',
  styleUrls: ['./estoque-form.component.css']
})
export class EstoqueFormComponent implements OnInit{
formGroup: FormGroup;
apiResponse: any = null;

estoques:Estoque[] = []
constructor(private formBuilder: FormBuilder,
  private estoqueService: EstoqueService,
  private router: Router,
  private activatedRoute: ActivatedRoute){


    const estoque: Estoque = this.activatedRoute.snapshot.data['estoque'];

    this.formGroup = formBuilder.group({
      id:[(estoque && estoque.id) ? estoque.id : null],
      nome:[(estoque && estoque.nome) ? estoque.nome : '', Validators.required],
      quantidade:[(estoque && estoque.quantidade) ? estoque.quantidade : '', Validators.required],
      preco:[(estoque && estoque.preco) ? estoque.preco : '', Validators.required],
    })
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  salvar() {
    if (this.formGroup.valid) {
      const estoque = this.formGroup.value;
      if (estoque.id == null) {
        this.estoqueService.save(estoque).subscribe({
          next: (estoqueCadastrado) => {
            this.router.navigateByUrl('/estoques/list');
          },
          error: (err) => {
            console.log('Erro ao incluir' + JSON.stringify(err));
          }
        });
      } else {
        this.estoqueService.update(estoque).subscribe({
          next: (estoqueCadastrado) => {
            this.router.navigateByUrl('/estoques/list');
          },
          error: (errorResponse) => {
            // Processar erros da API
           this.apiResponse = errorResponse.error;

           // Associar erros aos campos do formulário
           this.formGroup.get('nome')?.setErrors({ apiError: this.getErrorMessage('nome') });
           this.formGroup.get('quantidade')?.setErrors({ apiError: this.getErrorMessage('quantidade') });
           this.formGroup.get('preco')?.setErrors({ apiError: this.getErrorMessage('preco') });


           console.log('Erro ao incluir' + JSON.stringify(errorResponse));
         }
        });
      }
    }
  }

  getErrorMessage(fieldName: string): string {
    const error = this.apiResponse.errors.find((error: any) => error.fieldName === fieldName);
    return error ? error.message : '';
  }


  excluir() {
    const estoque = this.formGroup.value;
    if (estoque.id != null) {
      this.estoqueService.delete(estoque).subscribe({
        next: (e) => {
          this.router.navigateByUrl('/estoques/list');
        },
        error: (err) => {
          console.log('Erro ao excluir' + JSON.stringify(err));
        }
      });
    }
  }
}
