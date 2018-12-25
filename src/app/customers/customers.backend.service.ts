import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";

import { Customer } from './models/customer';
import { CustomerType } from './models/customer-type';

@Injectable({
  providedIn: 'root'
})
export class CustomersBackendService {

  constructor(private http: HttpClient) { }

  getCustomers(): Observable<Customer[]> {
    return this.http.get('customers')
      .pipe(map(data => data as Customer[] ));
  }

  getCustomerTypes(): Observable<CustomerType[]> {
    return this.http.get('customer-add')
      .pipe(map(data => data as CustomerType[] ));
  }

  createCustomer(title: string, firstName: string, lastName: string,
    typeId: number): Observable<Customer> {
    return this.http.post('customers', {
      title: title,
      firstName: firstName,
      lastName: lastName,
      typeId: typeId
    })
      .pipe(map(data => data as Customer ));
  }

  getCustomersByFilter(firstName: string, lastName: string): Observable<Customer[]> {
    return this.http.post('customers:filtered', {
      firstName: firstName,
      lastName: lastName
    })
      .pipe(map(data => data as Customer[]));
  }

  editCustomer(id: number, title: string, firstName: string, lastName: string, type: number): Observable<Customer[]> {
    return this.http.post('customers:edit', {
      id: id,
      title: title,
      firstName: firstName,
      lastName: lastName,
      typeId: type,
    })
      .pipe(map(data => data as Customer[] ));
  }

  deleteCustomer(id: number): Observable<Customer[]> {
    return this.http.post('customers:delete', {
      id: id
    })
      .pipe(map(data => data as Customer[] ));
  }

}
