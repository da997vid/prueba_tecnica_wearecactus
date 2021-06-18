import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  /** Get data products from external local file */
  getDataExternalProducts(name_file: string) {
    return this.http.get('assets/data/' + name_file);
  }
}
