import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { APIRespt } from '../interfaces/ApiRespt.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private urlApi = environment.urlApi;
  constructor(private http: HttpClient) { }

  get persons() {
    return this.http.get<APIRespt>(`${this.urlApi}/api/character`)
  }


  getPersonPage(numberPage: number) {
    return this.http.get<APIRespt>(`${this.urlApi}/api/character?page=${numberPage}`);
  }

  getPersonSearch(name: string, page?: number) {
    return this.http.get<APIRespt>(`${this.urlApi}/api/character?name=${name}&page=${page}`);
  }
}
