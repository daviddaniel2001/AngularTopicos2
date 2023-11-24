import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { UserTemplateComponent } from './shared/components/user-template/user-template.component';
import { CarrinhoComponent } from './compra/components/carrinho/carrinho.component';
import { AdminTemplateComponent } from './shared/components/admin-template/admin-template.component';


const routes: Routes = [
  /*
    {path:'admin', loadChildren:
    () => import('./administrador/administrador.module').then(m => m.AdministradorModule)},

    { path:'admin/produto', loadChildren:
    () => import('./administrador/cadastro-produto/cadastro-produto.module').then(m => m.ProdutoModule) },

     { path:'admin/flor', loadChildren:
     () => import('./administrador/cadastro-flor/cadastro-flor.module').then(m => m.FlorModule) },

     { path:'admin/fornecedor', loadChildren:
     () => import('./administrador/cadastro-fornecedor/cadastro-fornecedor.module').then(m => m.FornecedorModule) },

     { path:'admin/usuarios', loadChildren:
     () => import('./administrador/cadastro-usuarios/cadastro-usuarios.module').then(m => m.UsuarioModule) },

     { path:'admin/cupom', loadChildren:
     () => import('./administrador/cadastro-cupom/cadastro-cupom.module').then(m => m.CupomModule) },

    { path:'login', loadChildren:
    () => import('./login/login.module').then(m => m.LoginModule) }
   */

  {
    path: 'admin',
    component: AdminTemplateComponent,
    children: [

        {
          path: 'estados', loadChildren:
            () => import('./administrador/estado/estado.module')
              .then(m => m.EstadoModule)
        },

        {
          path: 'cidades', loadChildren:
            () => import('./administrador/cidade/cidade.module')
              .then(m => m.CidadeModule)
        },
        {
          path: 'produtos', loadChildren:
            () => import('./administrador/cadastro-produto/cadastro-produto.module')
              .then(m => m.ProdutoModule)
        },
        {
          path: 'flores', loadChildren:
            () => import('./administrador/cadastro-flor/cadastro-flor.module')
              .then(m => m.FlorModule)
        },
        {
          path: 'fornecedores', loadChildren:
            () => import('./administrador/cadastro-fornecedor/cadastro-fornecedor.module')
              .then(m => m.FornecedorModule)
        },
        {
          path: 'usuarios', loadChildren:
            () => import('./administrador/cadastro-usuarios/cadastro-usuarios.module')
              .then(m => m.UsuarioModule)
        },
        {
          path: 'cupons', loadChildren:
            () => import('./administrador/cadastro-cupom/cadastro-cupom.module')
              .then(m => m.CupomModule)
        },
        {
          path: 'promocoes', loadChildren:
            () => import('./administrador/cadastro-promocao/cadastro-promocao.module')
              .then(m => m.PromocaoModule)
        }
      ]
  },
  {
        path: 'user',
        component: UserTemplateComponent,
        children: [
        { path: 'login', component: LoginComponent },
         // { path: 'register', component: RegisterComponent },
          { path: 'carrinho', component: CarrinhoComponent },
    ],
   },
        { path: '', redirectTo: '/user', pathMatch: 'full' }, // Rota padrão
        { path: '**', redirectTo: '/user' }, // Rota para tratamento de erro

        {
          path: 'login',
          component: LoginComponent,
        },
        {
          path: 'carrinho',
          component: CarrinhoComponent,
        }

  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
