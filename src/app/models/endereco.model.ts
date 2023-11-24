import { Cidade } from "./cidade.model";

export class Endereco {
    id!: number;
    bairro!: string;
    numero!: string;
    complemento!: string;
    cidade!: Cidade;
}
