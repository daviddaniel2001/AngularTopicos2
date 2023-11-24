import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Fornecedor } from '../models/fornecedor.model';

@Injectable({
  providedIn: 'root'
})
export class FornecedorService {
  private baseURL: string =  'http://localhost:8080';

  constructor(private http: HttpClient) {}

  findAll(pagina: number, tamanhoPagina: number): Observable<Fornecedor[]> {
    const params = {
      page: pagina.toString(),
      pageSize: tamanhoPagina.toString()
    }
    return this.http.get<Fornecedor[]>(`${this.baseURL}/fornecedores`, {params});
  }

  findById(id: string): Observable<Fornecedor> {
    return this.http.get<Fornecedor>(`${this.baseURL}/fornecedores/${id}`);
  }
  findByNome(nome: string, pagina: number, tamanhoPagina: number): Observable<Fornecedor[]> {
    const params = {
      page: pagina.toString(),
      pageSize: tamanhoPagina.toString()
    }
    return this.http.get<Fornecedor[]>(`${this.baseURL}/fornecedores/search/${nome}`, {params});
  }


  save(fornecedores: Fornecedor): Observable<Fornecedor> {
    return this.http.post<Fornecedor>(`${this.baseURL}/fornecedores`, fornecedores);
  }

  update(fornecedores: Fornecedor): Observable<Fornecedor> {
    return this.http.put<Fornecedor>(`${this.baseURL}/fornecedores/${fornecedores.id}`, fornecedores);
  }

  delete(fornecedor: Fornecedor): Observable<any> {
    return this.http.delete<Fornecedor>(`${this.baseURL}/fornecedores/${fornecedor.id}`);
  }

  count(): Observable<number> {
    return this.http.get<number>(`${this.baseURL}/fornecedores/count`);
  }

  countByNome(nome: string): Observable<number> {
    return this.http.get<number>(`${this.baseURL}/fornecedores/search/${nome}/count`);
  }

}

