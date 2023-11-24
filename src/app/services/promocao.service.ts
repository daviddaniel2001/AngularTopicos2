import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Promocao } from '../models/promocao.model';


@Injectable({
  providedIn: 'root'
})
export class PromocaoService {
  private baseURL: string =  'http://localhost:8080';

  constructor(private http: HttpClient) {}

  findAll(pagina: number, tamanhoPagina: number): Observable<Promocao[]> {
    const params = {
      page: pagina.toString(),
      pageSize: tamanhoPagina.toString()
    }
    return this.http.get<Promocao[]>(`${this.baseURL}/promocoes`, {params});
  }

  findById(id: string): Observable<Promocao> {
    return this.http.get<Promocao>(`${this.baseURL}/promocoes/${id}`);
  }
  findByNome(nome: string, pagina: number, tamanhoPagina: number): Observable<Promocao[]> {
    const params = {
      page: pagina.toString(),
      pageSize: tamanhoPagina.toString()
    }
    return this.http.get<Promocao[]>(`${this.baseURL}/promocoes/search/${nome}`, {params});
  }

  save(promocao: Promocao): Observable<Promocao> {
    return this.http.post<Promocao>(`${this.baseURL}/promocoes`, promocao);
  }

  update(promocao: Promocao): Observable<Promocao> {
    return this.http.put<Promocao>(`${this.baseURL}/promocaos/${promocao.id}`, promocao );
  }

  delete(promocao: Promocao): Observable<any> {
    return this.http.delete<Promocao>(`${this.baseURL}/promocaos/${promocao.id}`);
  }
  count(): Observable<number> {
    return this.http.get<number>(`${this.baseURL}/cupons/count`);
  }

  countByNome(nome: string): Observable<number> {
    return this.http.get<number>(`${this.baseURL}/cupons/search/${nome}/count`);
  }

}

