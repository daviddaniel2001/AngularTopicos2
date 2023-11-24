import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Pedido } from 'src/app/models/pedido.model';
import { PedidoService } from 'src/app/services/pedido.service';

@Component({
  selector: 'app-pedido-form',
  templateUrl: './pedido-form.component.html',
  styleUrls: ['./pedido-form.component.css']
})
export class PedidoFormComponent {
  formGroup: FormGroup;
  apiResponse: any = null;

  pedido:Pedido[] = []
  constructor(private formBuilder: FormBuilder,
    private pedidoService: PedidoService,
    private router: Router,
    private activatedRoute: ActivatedRoute){


      const pedido: Pedido = this.activatedRoute.snapshot.data['pedido'];

      this.formGroup = formBuilder.group({
        id:[(pedido && pedido.id) ? pedido.id : null],
        usuario:[(pedido && pedido.usuario) ? pedido.usuario : '', Validators.required],
        dataPedido:[(pedido && pedido.dataPedido) ? pedido.dataPedido : '', Validators.required],
      })
    }
    ngOnInit(): void {
      throw new Error('Method not implemented.');
    }

    salvar() {
      if (this.formGroup.valid) {
        const pedido = this.formGroup.value;
        if (pedido.id == null) {
          this.pedidoService.save(pedido).subscribe({
            next: (pedidoCadastrado) => {
              this.router.navigateByUrl('/pedidos/list');
            },
            error: (errorResponse) => {
              // Processar erros da API
             this.apiResponse = errorResponse.error;

             // Associar erros aos campos do formulário
             this.formGroup.get('dataPedido')?.setErrors({ apiError: this.getErrorMessage('dataPedido') });
             this.formGroup.get('usuario')?.setErrors({ apiError: this.getErrorMessage('usuario') });

             console.log('Erro ao incluir' + JSON.stringify(errorResponse));
            }
          });

        } else {
          this.pedidoService.update(pedido).subscribe({
            next: (pedidoCadastrado) => {
              this.router.navigateByUrl('/pedidos/list');
            },
            error: (errorResponse) => {
              // Processar erros da API
             this.apiResponse = errorResponse.error;

             // Associar erros aos campos do formulário
             this.formGroup.get('usuario')?.setErrors({ apiError: this.getErrorMessage('usuario') });
             this.formGroup.get('dataPedido')?.setErrors({ apiError: this.getErrorMessage('dataPedido') });

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
      const pedido = this.formGroup.value;
      if (pedido.id != null) {
        this.pedidoService.delete(pedido).subscribe({
          next: (e) => {
            this.router.navigateByUrl('/pedidos/list');
          },
          error: (err) => {
            console.log('Erro ao excluir' + JSON.stringify(err));
          }
        });
      }
    }
}
