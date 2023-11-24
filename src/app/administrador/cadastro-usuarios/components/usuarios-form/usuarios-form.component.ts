import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-fornecedor-form',
  templateUrl: './usuarios-form.component.html',
  styleUrls: ['./usuarios-form.component.css']
})
export class UsuarioFormComponent {
  formGroup: FormGroup;
  apiResponse: any = null;

  perfis:any = [
    { id:1, nome:"adm" },
    { id:2, nome:"usuario" }
  ]
  sexos:any = [
    { id:1, nome:"homem" },
    { id:2, nome:"mulher" }
  ]
  constructor(private formBuilder: FormBuilder,
              private usuarioService: UsuarioService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {

    const usuario: Usuario = this.activatedRoute.snapshot.data['usuario'];

    this.formGroup = formBuilder.group({
      id:[(usuario && usuario.id) ? usuario.id : null],
      nome:[(usuario && usuario.nome) ? usuario.nome : '', Validators.required],
      cpf:[(usuario && usuario.cpf) ? usuario.cpf : '', Validators.required],
      sexo:[(usuario && usuario.sexo) ? usuario.sexo : '', Validators.required],
      telefone:[(usuario && usuario.telefone) ? usuario.telefone: '', Validators.required],
      endereco:[(usuario && usuario.endereco) ? usuario.endereco : '', Validators.required],
      perfil:[(usuario && usuario.perfis) ? usuario.perfis: '', Validators.required],
      login:[(usuario && usuario.login) ? usuario.login: '', Validators.required],
      senha:[(usuario && usuario.senha) ? usuario.senha : '', Validators.required],
      nomeImagem:[(usuario && usuario.nomeImagem) ? usuario.nomeImagem : '', Validators.required]
    })
  }

  salvar() {
    if (this.formGroup.valid) {
      const usuario = this.formGroup.value;
      if (usuario.id == null) {
        this.usuarioService.save(usuario).subscribe({
          next: (usuarioCadastrado) => {
            this.router.navigateByUrl('/usuarios/list');
          },
          error: (errorResponse) => {
            this.apiResponse = errorResponse.error;

            this.formGroup.get('nome')?.setErrors({apiError: this.getErrorMessage('nome') });
            this.formGroup.get('cpf')?.setErrors({apiError: this.getErrorMessage('cpf')});
            this.formGroup.get('sexo')?.setErrors({apiError: this.getErrorMessage('sexo')});
            this.formGroup.get('telefone')?.setErrors({apiError: this.getErrorMessage('telefone')});
            this.formGroup.get('endereco')?.setErrors({apiError: this.getErrorMessage('endereco')});
            this.formGroup.get('perfil')?.setErrors({apiError: this.getErrorMessage('perfil')});
            this.formGroup.get('login')?.setErrors({apiError: this.getErrorMessage('login')});
            this.formGroup.get('senha')?.setErrors({apiError: this.getErrorMessage('senha')});
            this.formGroup.get('nomeImagem')?.setErrors({apiError: this.getErrorMessage('nomeImagem')});
          }
        });
      } else {
        this.usuarioService.update(usuario).subscribe({
          next: (usuarioCadastrado) => {
            this.router.navigateByUrl('/usuarios/list');
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
    const usuario = this.formGroup.value;
    if (usuario.id != null) {
      this.usuarioService.delete(usuario).subscribe({
        next: (e) => {
          this.router.navigateByUrl('/usuarios/list');
        },
        error: (err) => {
          console.log('Erro ao excluir' + JSON.stringify(err));
        }
      });
    }
  }

}
