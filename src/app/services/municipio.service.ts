import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Municipio } from '../models/municipio.model'

@Injectable({
  providedIn: 'root'
})
export class MunicipioService {
  private baseURL: string =  'http://localhost:8080';

  constructor(private http: HttpClient) {}

  findAll(): Observable<Municipio[]> {
    return this.http.get<Municipio[]>(`${this.baseURL}/municipios`);
  }

  findById(id: string): Observable<Municipio> {
    return this.http.get<Municipio>(`${this.baseURL}/municipios/${id}`);
  }

  save(municipio: Municipio): Observable<Municipio> {
    return this.http.post<Municipio>(`${this.baseURL}/municipios`, municipio);
  }

  update(municipio: Municipio): Observable<Municipio> {
    return this.http.put<Municipio>(`${this.baseURL}/municipios/${municipio.id}`, municipio );
  }

  delete(municipio: Municipio): Observable<any> {
    return this.http.delete<Municipio>(`${this.baseURL}/municipios/${municipio.id}`);
  }

}
