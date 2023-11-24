import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transportadora } from '../models/transportadora.model';

@Injectable({
  providedIn: 'root'
})
export class TransportadoraService {
  private baseURL: string =  'http://localhost:8080';

  constructor(private http: HttpClient) {}

  findAll(): Observable<Transportadora[]> {
    return this.http.get<Transportadora[]>(`${this.baseURL}/transportadoras`);
  }

  findById(id: string): Observable<Transportadora> {
    return this.http.get<Transportadora>(`${this.baseURL}/transportadoras/${id}`);
  }

  save(transportadora: Transportadora): Observable<Transportadora> {
    return this.http.post<Transportadora>(`${this.baseURL}/transportadoras`, transportadora);
  }

  update(transportadora: Transportadora): Observable<Transportadora> {
    return this.http.put<Transportadora>(`${this.baseURL}/transportadoras/${transportadora.id}`, transportadora );
  }

  delete(transportadora: Transportadora): Observable<any> {
    return this.http.delete<Transportadora>(`${this.baseURL}/transportadoras/${transportadora.id}`);
  }

}
