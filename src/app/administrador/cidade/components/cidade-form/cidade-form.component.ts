import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cidade } from 'src/app/models/cidade.model';
import { CidadeService } from 'src/app/services/cidade.service';

@Component({
  selector: 'app-cidade-form',
  templateUrl: './cidade-form.component.html',
  styleUrls: ['./cidade-form.component.css']
})
export class CidadeFormComponent {
  formGroup: FormGroup;
  apiResponse: any = null;

  constructor(private formBuilder: FormBuilder,
              private cidadeService: CidadeService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {

    const cidade: Cidade = this.activatedRoute.snapshot.data['cidade'];

    this.formGroup = formBuilder.group({
      id:[(cidade && cidade.id) ? cidade.id : null],
      nome:[(cidade && cidade.nome) ? cidade.nome : '', Validators.required],
      estado:[(cidade && cidade.estado) ? cidade.estado : '', Validators.required]
    })
  }


  salvar() {
    if (this.formGroup.valid) {
      const cidade = this.formGroup.value;
      if (cidade.id == null) {
        this.cidadeService.save(cidade).subscribe({
          next: (cidadeCadastrado) => {
            this.router.navigateByUrl('/cidades/list');
          },
          error: (errorResponse) => {
           this.apiResponse = errorResponse.error;

           this.formGroup.get('nome')?.setErrors({ apiError: this.getErrorMessage('nome') });
           this.formGroup.get('estado')?.setErrors({ apiError: this.getErrorMessage('estado') });

           console.log('Erro ao incluir' + JSON.stringify(errorResponse));
         }
       });
      } else {
        this.cidadeService.update(cidade).subscribe({
          next: (cidadeCadastrado) => {
            this.router.navigateByUrl('/cidades/list');
          },
          error: (err) => {
            console.log('Erro ao alterar' + JSON.stringify(err));
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
    const cidade = this.formGroup.value;
    if (cidade.id != null) {
      this.cidadeService.delete(cidade).subscribe({
        next: (e) => {
          this.router.navigateByUrl('/cidades/list');
        },
        error: (err) => {
          console.log('Erro ao excluir' + JSON.stringify(err));
        }
      });
    }
  }

}
