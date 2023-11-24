import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Estoque } from '../models/estoque.model';

@Injectable({
  providedIn: 'root'
})
export class EstoqueService {

    private baseURL: string =  'http://localhost:8080/estoque';

    constructor(private http: HttpClient) {}

    findAll(pagina: number, tamanhoPagina: number): Observable<Estoque[]> {
      const params = {
        page: pagina.toString(),
        pageSize: tamanhoPagina.toString()
      }
      return this.http.get<Estoque[]>(`${this.baseURL}`, {params});
    }

    findById(id: string): Observable<Estoque> {
      return this.http.get<Estoque>(`${this.baseURL}/${id}`);
    }

    findByNome(nome: string, pagina: number, tamanhoPagina: number): Observable<Estoque[]> {
      const params = {
        page: pagina.toString(),
        pageSize: tamanhoPagina.toString()
      }
      return this.http.get<Estoque[]>(`${this.baseURL}/search/${nome}`, {params});
    }

    save(estoque: Estoque): Observable<Estoque> {
      return this.http.post<Estoque>(`${this.baseURL}`, estoque);
    }

    update(estoque: Estoque): Observable<Estoque> {
      return this.http.put<Estoque>(`${this.baseURL}/${estoque.id}`, estoque );
    }

    delete(estoque: Estoque): Observable<any> {
      return this.http.delete<Estoque>(`${this.baseURL}/${estoque.id}`);
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

}
