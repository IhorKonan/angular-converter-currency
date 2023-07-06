import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RateService {

  constructor(
    private http: HttpClient
  ) { }
  private ratesURL = 'https://api.exchangerate.host/latest?base=';
  getRates(currencyName: string): Observable<any> {
    return this.http.get<any>(this.ratesURL + currencyName)
  }
}
