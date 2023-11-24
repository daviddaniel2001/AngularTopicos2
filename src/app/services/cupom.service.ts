import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cupom } from '../models/cupom.model';

@Injectable({
  providedIn: 'root'
})
export class CupomService {
  private baseURL: string =  'http://localhost:8080';

  constructor(private http:HttpClient) {}

  findAll(pagina: number, tamanhoPagina: number): Observable<Cupom[]> {
    const params = {
      page: pagina.toString(),
      pageSize: tamanhoPagina.toString()
    }
    return this.http.get<Cupom[]>(`${this.baseURL}/cupons`, {params});
  }

  findById(id: string): Observable<Cupom> {
    return this.http.get<Cupom>(`${this.baseURL}/cupons/${id}`);
  }
  findByNome(nome: string, pagina: number, tamanhoPagina: number): Observable<Cupom[]> {
    const params = {
      page: pagina.toString(),
      pageSize: tamanhoPagina.toString()
    }
    return this.http.get<Cupom[]>(`${this.baseURL}/cupons/search/${nome}`, {params});
  }

  save(cupom: Cupom): Observable<Cupom> {
    return this.http.post<Cupom>(`${this.baseURL}/cupons`, cupom);
  }

  update(cupom: Cupom): Observable<Cupom> {
    return this.http.put<Cupom>(`${this.baseURL}/cupons/${cupom.id}`, cupom );
  }

  delete(cupom: Cupom): Observable<any> {
    return this.http.delete<Cupom>(`${this.baseURL}/cupons/${cupom.id}`);
  }

  count(): Observable<number> {
    return this.http.get<number>(`${this.baseURL}/cupons/count`);
  }

  countByNome(nome: string): Observable<number> {
    return this.http.get<number>(`${this.baseURL}/cupons/search/${nome}/count`);
  }

}


