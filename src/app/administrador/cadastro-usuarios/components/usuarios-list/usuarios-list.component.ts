import { Component, OnInit } from '@angular/core';
import { Fornecedor } from 'src/app/models/fornecedor.model';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuario-list',
  templateUrl: './usuarios-list.component.html',
  styleUrls: ['./usuarios-list.component.css']
})
export class UsuarioListComponent implements OnInit {

  tableColumns: string[] = ['id-column', 'nome-column', 'cpf-column', 'sexo-column', 'telefone-column', 'endereco-column', 'perfil-column', 'login-column', 'senha-column', 'imagem-column'];
  usuarios: Usuario[] = [];

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.usuarioService.findAll().subscribe(data => {
      this.usuarios = data;
    });
  }

}
