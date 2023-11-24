import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pedido } from '../models/pedido.model';


@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private baseURL: string =  'http://localhost:8080';

  constructor(private http: HttpClient) {}

  findAll(pagina: number, tamanhoPagina: number): Observable<Pedido[]> {
    const params = {
      page: pagina.toString(),
      pageSize: tamanhoPagina.toString()
    }
    return this.http.get<Pedido[]>(`${this.baseURL}/pedidos`, {params});
  }

  findById(id: string): Observable<Pedido> {
    return this.http.get<Pedido>(`${this.baseURL}/pedidos/${id}`);
  }
  findByNome(nome: string, pagina: number, tamanhoPagina: number): Observable<Pedido[]> {
    const params = {
      page: pagina.toString(),
      pageSize: tamanhoPagina.toString()
    }
    return this.http.get<Pedido[]>(`${this.baseURL}/pedidos/search/${nome}`, {params});
  }

  save(pedido: Pedido): Observable<Pedido> {
    const obj = {
      nome: pedido.usuario,
      dataPedido: pedido.dataPedido,
      usuario: pedido.usuario
    }
    return this.http.post<Pedido>(`${this.baseURL}/pedidos`, obj);
  }

  update(pedido: Pedido): Observable<Pedido> {
    const obj = {
      nome: pedido.usuario,
      dataPedido: pedido.dataPedido,
      usuario: pedido.usuario
    }
    return this.http.put<Pedido>(`${this.baseURL}/pedidos/${pedido.id}`, obj );
  }

  delete(pedido: Pedido): Observable<any> {
    return this.http.delete<Pedido>(`${this.baseURL}/pedidos/${pedido.id}`);
  }
  count(): Observable<number> {
    return this.http.get<number>(`${this.baseURL}/cupons/count`);
  }

  countByNome(nome: string): Observable<number> {
    return this.http.get<number>(`${this.baseURL}/cupons/search/${nome}/count`);
  }

}


