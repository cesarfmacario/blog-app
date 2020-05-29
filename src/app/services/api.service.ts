import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export const API_URL = "https://jsonplaceholder.typicode.com";

@Injectable()
export class ApiService {

  get httpOptions(): any {
    let _httpOptions: any = {
      "headers": {
        "Content-Type": "application/json",
      }
    }
    return _httpOptions;
  }

  constructor(public http: HttpClient, public router: Router) { }

  get(url: string, params?) {
    let options = {
      ...this.httpOptions,
      params
    }
    return this.http.get(`${API_URL}${url}`, options);
  }

  post(url: string, body: any) {
    return this.http.post(`${API_URL}${url}`, body, this.httpOptions);
  }

  put(url: string, body: any) {
    return this.http.put(`${API_URL}${url}`, body, this.httpOptions);
  }

  delete(url: string) {
    return this.http.delete(`${API_URL}${url}`, this.httpOptions);
  }

}
