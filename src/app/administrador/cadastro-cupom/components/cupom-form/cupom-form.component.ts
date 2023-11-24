import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cupom } from 'src/app/models/cupom.model';
import { CupomService } from 'src/app/services/cupom.service';

@Component({
  selector: 'app-cupom-form',
  templateUrl: './cupom-form.component.html',
  styleUrls: ['./cupom-form.component.css']
})

export class CupomFormComponent {
  formGroup: FormGroup;
  apiResponse: any = null;

  constructor(private formBuilder: FormBuilder,
              private cupomService: CupomService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {

    const cupom: Cupom = this.activatedRoute.snapshot.data['cupom'];

    this.formGroup = formBuilder.group({
      id:[(cupom && cupom.id) ? cupom.id : null],
      codigo:[(cupom && cupom.codigo) ? cupom.codigo : '', Validators.required],
      porcetagem:[(cupom && cupom.porcetagem) ? cupom.porcetagem : '', Validators.required],
      ativo:[(cupom && cupom.ativo) ? cupom.ativo: '', Validators.required],
      validade:[(cupom && cupom.validade) ? cupom.validade : '', Validators.required]

    })
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  salvar() {
    if (this.formGroup.valid) {
      const cupom = this.formGroup.value;
      if (cupom.id == null) {
        this.cupomService.save(cupom).subscribe({
          next: (cupomCadastrado) => {
            this.router.navigateByUrl('/cupons/list');
          },
          error: (errorResponse) => {
           this.apiResponse = errorResponse.error;

           this.formGroup.get('codigo')?.setErrors({ apiError: this.getErrorMessage('codigo') });
           this.formGroup.get('porcentagem')?.setErrors({ apiError: this.getErrorMessage('porcentagem') });
           this.formGroup.get('ativo')?.setErrors({ apiError: this.getErrorMessage('ativo') });
           this.formGroup.get('validade')?.setErrors({ apiError: this.getErrorMessage('validade') });
           console.log('Erro ao incluir' + JSON.stringify(errorResponse));
         }
       });

      } else {
        this.cupomService.update(cupom).subscribe({
          next: (cupomCadastrado) => {
            this.router.navigateByUrl('/cupons/list');
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
    const cupom = this.formGroup.value;
    if (cupom.id != null) {
      this.cupomService.delete(cupom).subscribe({
        next: (e) => {
          this.router.navigateByUrl('/cupons/list');
        },
        error: (err) => {
          console.log('Erro ao excluir' + JSON.stringify(err));
        }
      });
    }
  }

}
