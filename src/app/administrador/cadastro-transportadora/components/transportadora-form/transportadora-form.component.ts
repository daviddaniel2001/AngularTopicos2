import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Transportadora } from 'src/app/models/transportadora.model';
import { TransportadoraService } from 'src/app/services/transportadora.service';

@Component({
  selector: 'app-transportadora-form',
  templateUrl: './transportadora-form.component.html',
  styleUrls: ['./transportadora-form.component.css']
})
export class TransportadoraFormComponent implements OnInit{
formGroup: FormGroup;
apiResponse: any = null;

transportadoras:Transportadora[] = []
constructor(private formBuilder: FormBuilder,
  private transportadoraService: TransportadoraService,
  private router: Router,
  private activatedRoute: ActivatedRoute){


    const transportadora: Transportadora = this.activatedRoute.snapshot.data['transportadora'];

    this.formGroup = formBuilder.group({
      id:[(transportadora && transportadora.id) ? transportadora.id : null],
      nome:[(transportadora && transportadora.nome) ? transportadora.nome : '', Validators.required],
      descricao:[(transportadora && transportadora.descricao) ? transportadora.descricao : '', Validators.required],
      taxas:[(transportadora && transportadora.taxas) ? transportadora.taxas : '', Validators.required],
      prazoEntrega:[(transportadora && transportadora.prazoEntrega) ? transportadora.prazoEntrega: '', Validators.required]
    })
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  salvar() {
    if (this.formGroup.valid) {
      const transportadora = this.formGroup.value;
      if (transportadora.id == null) {
        this.transportadoraService.save(transportadora).subscribe({
          next: (transportadoraCadastrado) => {
            this.router.navigateByUrl('/transportadoras/list');
          },
          error: (err) => {
            console.log('Erro ao incluir' + JSON.stringify(err));
          }
        });
      } else {
        this.transportadoraService.update(transportadora).subscribe({
          next: (transportadoraCadastrado) => {
            this.router.navigateByUrl('/transportadoras/list');
          },
          error: (errorResponse) => {
            // Processar erros da API
           this.apiResponse = errorResponse.error;

           // Associar erros aos campos do formulário
           this.formGroup.get('nome')?.setErrors({ apiError: this.getErrorMessage('nome') });
           this.formGroup.get('descricao')?.setErrors({ apiError: this.getErrorMessage('descricao') });
           this.formGroup.get('taxas')?.setErrors({ apiError: this.getErrorMessage('taxas') });
           this.formGroup.get('prazoEntrega')?.setErrors({ apiError: this.getErrorMessage('prazoEntrega') });

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
    const transportadora = this.formGroup.value;
    if (transportadora.id != null) {
      this.transportadoraService.delete(transportadora).subscribe({
        next: (e) => {
          this.router.navigateByUrl('/transportadoras/list');
        },
        error: (err) => {
          console.log('Erro ao excluir' + JSON.stringify(err));
        }
      });
    }
  }
}
