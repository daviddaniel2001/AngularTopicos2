import { Endereco } from "./endereco.model";
import { Telefone } from "./telefone.model";

export class Usuario {
    id!: number;
    nome!: string;
    cpf!:string;
    sexo!: number
    telefone!: Telefone;
    endereco!:Endereco;
    perfis!: number[]
    login!: string;
    senha!: string;
    nomeImagem!: string;
}
