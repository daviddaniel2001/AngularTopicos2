import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Promocao } from 'src/app/models/promocao.model';
import { PromocaoService } from 'src/app/services/promocao.service';


@Component({
  selector: 'app-promocao-form',
  templateUrl: './promocao-form.component.html',
  styleUrls: ['./promocao-form.component.css'],
})
export class PromocaoFormComponent {
  formGroup: FormGroup;
  apiResponse: any = null;

  constructor(
    private formBuilder: FormBuilder,
    private promocaoService: PromocaoService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    const promocao: Promocao =
      this.activatedRoute.snapshot.data['promocao'];

    this.formGroup = formBuilder.group({
      id:[(promocao && promocao.id) ? promocao.id : null],
      nomePromocao:[(promocao && promocao.nomePromocao) ? promocao.nomePromocao : '', Validators.required],
      produtoElegivel:[(promocao && promocao.produtoElegivel) ? promocao.produtoElegivel : '', Validators.required],
      desconto:[(promocao && promocao.desconto) ? promocao.desconto : '', Validators.required],
      dataInicio:[(promocao && promocao.dataInicio) ? promocao.dataInicio : '', Validators.required],
      dataTermino:[(promocao && promocao.dataTermino) ? promocao.dataTermino : '', Validators.required]

    })
  }

  salvar() {
    if (this.formGroup.valid) {
      const promocao = this.formGroup.value;
      if (promocao.id == null) {
        this.promocaoService.save(promocao).subscribe({
          next: (promocaoCadastrado) => {
            this.router.navigateByUrl('/promocoes/list');
          },
          error: (errorResponse) => {
           this.apiResponse = errorResponse.error;

           this.formGroup.get('nomePromocao')?.setErrors({ apiError: this.getErrorMessage('nomePromocao') });
           this.formGroup.get('produtoElegivel')?.setErrors({ apiError: this.getErrorMessage('produtoElegivel') });
           this.formGroup.get('desconto')?.setErrors({ apiError: this.getErrorMessage('desconto') });
           this.formGroup.get('dataInicio')?.setErrors({ apiError: this.getErrorMessage('dataInicio') });
           this.formGroup.get('dataTermino')?.setErrors({ apiError: this.getErrorMessage('dataTermino') });

           console.log('Erro ao incluir' + JSON.stringify(errorResponse));
         }
       });

      } else {
        this.promocaoService.update(promocao).subscribe({
          next: (promocaoCadastrado) => {
            this.router.navigateByUrl('/promocoes/list');
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
    const promocao = this.formGroup.value;
    if (promocao.id != null) {
      this.promocaoService.delete(promocao).subscribe({
        next: (e) => {
          this.router.navigateByUrl('/promocoes/list');
        },
        error: (err) => {
          console.log('Erro ao excluir' + JSON.stringify(err));
        },
      });
    }
  }
}
