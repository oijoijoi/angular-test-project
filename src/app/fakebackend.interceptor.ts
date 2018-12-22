import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';

import Metaphone from 'metaphone';

import { Customer } from './customers/models/customer';
import { CustomerType } from './customers/models/customer-type';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

      if (request.url.endsWith('customer-add') && request.method === 'GET') {
        return of(new HttpResponse({ status: 200, body: customerTypes }));
      }

      if (request.url.endsWith('customers') && request.method === 'GET') {
        return of(new HttpResponse({ status: 200, body: customers }));
      }

      if (request.url.endsWith('customers') && request.method === 'POST') {
        const type = customerTypes.find(x => x.customerTypeId === parseInt(request.body.typeId, 10));
        const customer: Customer = {
          id: customers.length + 1,
          title: request.body.title,
          firstName: request.body.firstName,
          firstNameMetaphone: Metaphone(request.body.firstName),
          lastName: request.body.lastName,
          lastNameMetaphone: Metaphone(request.body.lastName),
          modifiedWhen: '2011-10-05T14:48:00.000Z',
          type: type,
        };
        console.log(customer);
        customers.unshift(customer);

        return of(new HttpResponse({ status: 200, body: customer }));
      }

      if (request.url.endsWith('customers:filtered') && request.method === 'POST') {
        const filteredCustomers =
          customers.filter(item =>
            (item.firstNameMetaphone === Metaphone(request.body.firstName)) ||
            (item.lastNameMetaphone === Metaphone(request.body.lastName)));
        console.log(filteredCustomers);
        return of(new HttpResponse({ status: 200, body: filteredCustomers }));
      }

      if (request.url.endsWith('customers:delete') && request.method === 'POST') {
        console.log('interseptor:' + request.body.id);
        customers.forEach((item, i) => {
          if (item.id === request.body.id) {
            customers.splice(i, 1);
          }
        });
        return of(new HttpResponse({ status: 200, body: customers }));
      }

      return next.handle(request);
    }
}

const customerTypes: CustomerType[] = [
  {
    customerTypeId: 1,
    customerTypeCaption: 'Residential'
  },
  {
    customerTypeId: 2,
    customerTypeCaption: 'Small/Medium Business'
  },
  {
    customerTypeId: 3,
    customerTypeCaption: 'Enterprise'
  }
];

const customers: Customer[] = [
  {
    id: 5,
    title: 'Mr',
    firstName: 'Ayrton',
    firstNameMetaphone: 'ARTN',
    lastName: 'Senna',
    lastNameMetaphone: 'SN',
    modifiedWhen: '2011-10-05T14:48:00.000Z',
    type: customerTypes[0],
  },
  {
    id: 4,
    title: 'Mr',
    firstName: 'Gerhard',
    firstNameMetaphone: 'JRHRT',
    lastName: 'Berger',
    lastNameMetaphone: 'BRJR',
    modifiedWhen: '2011-10-05T14:48:00.000Z',
    type: customerTypes[0],
  },
  {
    id: 3,
    title: 'Mr',
    firstName: 'Stefano',
    firstNameMetaphone: 'STFN',
    lastName: 'Modena',
    lastNameMetaphone: 'MTN',
    modifiedWhen: '2011-10-05T14:48:00.000Z',
    type: customerTypes[2],
  },
  {
    id: 2,
    title: 'Mr',
    firstName: 'Nigel',
    firstNameMetaphone: 'NJL',
    lastName: 'Mansell',
    lastNameMetaphone: 'MNSL',
    modifiedWhen: '2011-10-05T14:48:00.000Z',
    type: customerTypes[2],
  },
  {
    id: 1,
    title: 'Mr',
    firstName: 'Riccardo',
    firstNameMetaphone: 'RKKRT',
    lastName: 'Patrese',
    lastNameMetaphone: 'PTRS',
    modifiedWhen: '2011-10-05T14:48:00.000Z',
    type: customerTypes[0],
  }
];

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};
