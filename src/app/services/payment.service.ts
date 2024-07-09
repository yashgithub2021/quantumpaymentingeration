import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

declare var Razorpay: any;

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  baseUrl = 'https://quantumit-backend.onrender.com/';
  constructor(private http: HttpClient) { }

  createOrder(payload:any) {
    return this.http.post(`${this.baseUrl}api/transactions/create-order`,payload);
  }
  currencyAmountConvert(currency_type:string){
    return this.http.get(`https://v6.exchangerate-api.com/v6/4eaf4228928ecadb16ae0df7/latest/${currency_type}`);
  }
}
