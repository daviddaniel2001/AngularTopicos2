import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Flor } from '../models/flor.model';
import {TipoFlor} from "../models/tipoFlor.model";

@Injectable({
  providedIn: 'root'
})
export class FlorService {
  private baseURL: string =  'http://localhost:8080/flores';

  constructor(private http: HttpClient) {}

  findAll(pagina: number, tamanhoPagina: number): Observable<Flor[]> {
    const params = {
      page: pagina.toString(),
      pageSize: tamanhoPagina.toString()
    }
    return this.http.get<Flor[]>(`${this.baseURL}`, {params});
  }

  findById(id: string): Observable<Flor> {
    return this.http.get<Flor>(`${this.baseURL}/${id}`);
  }

  findByNome(nome: string, pagina: number, tamanhoPagina: number): Observable<Flor[]> {
    const params = {
      page: pagina.toString(),
      pageSize: tamanhoPagina.toString()
    }
    return this.http.get<Flor[]>(`${this.baseURL}/search/${nome}`, {params});
  }

  save(flor: Flor): Observable<Flor> {
    const obj = {
      descricao: flor.descricao,
      preco: flor.preco,
      corPetalas: flor.corPetalas,
      idTipoFlor: flor.tipoFlor.id
    }
    return this.http.post<Flor>(`${this.baseURL}`, obj);
  }

  update(flor: Flor): Observable<Flor> {
    const obj = {
      descricao: flor.descricao,
      preco: flor.preco,
      corPetalas: flor.corPetalas,
      idTipoFlor: flor.tipoFlor.id
    }
    return this.http.put<Flor>(`${this.baseURL}/${flor.id}`, obj );
  }

  delete(flor: Flor): Observable<any> {
    return this.http.delete<Flor>(`${this.baseURL}/${flor.id}`);
  }

  count(): Observable<number> {
    return this.http.get<number>(`${this.baseURL}/count`);
  }

  countByNome(nome: string): Observable<number> {
    return this.http.get<number>(`${this.baseURL}/search/${nome}/count`);
  }
  getUrlImagem(nomeImagem: string): string {
    return `${this.baseURL}/image/download/${nomeImagem}`;
  }

  uploadImagem(id: number, nomeImagem: string, imagem: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('id', id.toString());
    formData.append('nomeImagem', imagem.name);
    formData.append('imagem', imagem, imagem.name);

    return this.http.patch<Flor>(`${this.baseURL}/image/upload`, formData);
  }

  findTipoFlores(): Observable<TipoFlor[]> {
    return this.http.get<TipoFlor[]>(`${this.baseURL}/tipoFlores`);
  }

}
