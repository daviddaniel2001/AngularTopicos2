import { Component} from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { Flor } from 'src/app/models/flor.model';
import { FlorService } from 'src/app/services/flor.service';
import {TipoFlor} from "../../../../models/tipoFlor.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-flor-form',
  templateUrl: './flor-form.component.html',
  styleUrls: ['./flor-form.component.css']
})

export class FlorFormComponent {
  formGroup: FormGroup;
  apiResponse: any = null;

  tipoFlores: TipoFlor[] = [];
  fileName: string = '';
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  constructor(private formBuilder: FormBuilder,
              private florService: FlorService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {


    this.formGroup = formBuilder.group({
      id:[null],
      corPetalas:[null],
      descricao:[null],
      preco:[null],
      alturaCaule:[null],
      nomeImagem:[null],
      tipoFlor:[null]

    });
    florService.findTipoFlores().subscribe(data => {
      this.tipoFlores = data;
      this.initializeForm();
    });
  }
  initializeForm() {
    const flor: Flor = this.activatedRoute.snapshot.data['flor'];

    const tipoFlor = this.tipoFlores.find(m => m.id === (flor?.tipoFlor?.id || null));

    console.log(tipoFlor);

    // carregando a imagem do preview
    if (flor && flor.nomeImagem) {
      this.imagePreview = this.florService.getUrlImagem(flor.nomeImagem);
      this.fileName = flor.nomeImagem;
    }
    this.formGroup = this.formBuilder.group({
      id:[(flor && flor.id) ? flor.id : null],
      corPetalas:[(flor && flor.corPetalas) ? flor.corPetalas : '', Validators.required],
      descricao:[(flor && flor.descricao) ? flor.descricao : '', Validators.required],
      preco:[(flor && flor.preco) ? flor.preco : '', Validators.required],
      tipoFlor:[tipoFlor]
    });
    console.log(this.formGroup.value);
  }

  salvar() {
    if (this.formGroup.valid) {
      const flor = this.formGroup.value;
      if (flor.id == null) {
        this.florService.save(flor).subscribe({
          next: (florCadastrada) => {
            this.uploadImage(florCadastrada.id);
          },
          error: (errorResponse) => {
           this.apiResponse = errorResponse.error;

           this.formGroup.get('corPetalas')?.setErrors({ apiError: this.getErrorMessage('corPetalas') });
           this.formGroup.get('descricao')?.setErrors({ apiError: this.getErrorMessage('descricao') });
           this.formGroup.get('preco')?.setErrors({ apiError: this.getErrorMessage('preco') });

           console.log('Erro ao incluir' + JSON.stringify(errorResponse));
         }
        });
      } else {
        this.florService.update(flor).subscribe({
          next: (florAtualizada) => {
            this.uploadImage(florAtualizada.id);
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
    const flor = this.formGroup.value;
    if (flor.id != null) {
      this.florService.delete(flor).subscribe({
        next: (e) => {
          this.router.navigateByUrl('/flores/list');
        },
        error: (err) => {
          console.log('Erro ao excluir' + JSON.stringify(err));
        }
      });
    }
  }
  carregarImagemSelecionada(event: any) {
    this.selectedFile = event.target.files[0];

    if (this.selectedFile) {
      this.fileName = this.selectedFile.name;
      // carregando image preview
      const reader = new FileReader();
      reader.onload = e => this.imagePreview = reader.result;
      reader.readAsDataURL(this.selectedFile);
    }

  }

  private uploadImage(florId: number) {
    if (this.selectedFile) {
      this.florService.uploadImagem(florId, this.selectedFile.name, this.selectedFile)
        .subscribe({
          next: () => {
            this.router.navigateByUrl('/flores/list');
          },
          error: err => {
            console.log('Erro ao fazer o upload da imagem');
            // tratar o erro
          }
        })
    } else {
      this.router.navigateByUrl('/flores/list');
    }
  }

}

