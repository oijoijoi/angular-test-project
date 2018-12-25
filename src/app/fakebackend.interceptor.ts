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
        customers.sort(function(a, b) { return b.modifiedWhen - a.modifiedWhen; });
        return of(new HttpResponse({ status: 200, body: customers }));
      }

      if (request.url.endsWith('customers') && request.method === 'POST') {
        const type = customerTypes.find(x => x.customerTypeId === parseInt(request.body.typeId, 10));
        const customer: Customer = {
          id: customers[0].id + 1,
          title: request.body.title,
          firstName: request.body.firstName,
          firstNameMetaphone: Metaphone(request.body.firstName),
          lastName: request.body.lastName,
          lastNameMetaphone: Metaphone(request.body.lastName),
          modifiedWhen: Date.now(),
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

      if (request.url.endsWith('customers:edit') && request.method === 'POST') {
        const type = customerTypes.find(x => x.customerTypeId === parseInt(request.body.typeId, 10));
        customers.forEach((item, i) => {
          if (item.id === request.body.id) {
            customers[i].title = request.body.title;
            customers[i].firstName = request.body.firstName;
            customers[i].firstNameMetaphone = Metaphone(request.body.firstName);
            customers[i].lastName = request.body.lastName;
            customers[i].lastNameMetaphone = Metaphone(request.body.lastName);
            customers[i].modifiedWhen = Date.now();
            customers[i].type = type;
            console.log(customers[i]);
          }
        });
        customers.sort(function(a, b) { return b.modifiedWhen - a.modifiedWhen; });
        return of(new HttpResponse({ status: 200, body: customers }));
      }

      if (request.url.endsWith('customers:delete') && request.method === 'POST') {
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
    id: 12,
    title: 'Mr',
    firstName: 'Nigel',
    firstNameMetaphone: 'NJL',
    lastName: 'Senna',
    lastNameMetaphone: 'SN',
    modifiedWhen: 1545764469202,
    type: customerTypes[0],
  },
  {
    id: 11,
    title: 'Mr',
    firstName: 'Gerhard',
    firstNameMetaphone: 'JRHRT',
    lastName: 'Senna',
    lastNameMetaphone: 'SN',
    modifiedWhen: 1545664269202,
    type: customerTypes[0],
  },
  {
    id: 10,
    title: 'Mr',
    firstName: 'Gerhard',
    firstNameMetaphone: 'JRHRT',
    lastName: 'Modena',
    lastNameMetaphone: 'MTN',
    modifiedWhen: 1545564269202,
    type: customerTypes[2],
  },
  {
    id: 9,
    title: 'Mr',
    firstName: 'Satoru',
    firstNameMetaphone: 'STR',
    lastName: 'Berger',
    lastNameMetaphone: 'BRJR',
    modifiedWhen: 1545464269202,
    type: customerTypes[0],
  },
  {
    id: 8,
    title: 'Mr',
    firstName: 'Ayrton',
    firstNameMetaphone: 'ARTN',
    lastName: 'Johansson',
    lastNameMetaphone: 'JHNSN',
    modifiedWhen: 1545364269202,
    type: customerTypes[2],
  },
  {
    id: 7,
    title: 'Mr',
    firstName: 'Stefan',
    firstNameMetaphone: 'STFN',
    lastName: 'Johansson',
    lastNameMetaphone: 'JHNSN',
    modifiedWhen: 1545264269202,
    type: customerTypes[2],
  },
  {
    id: 6,
    title: 'Mr',
    firstName: 'Satoru',
    firstNameMetaphone: 'STR',
    lastName: 'Nakajima',
    lastNameMetaphone: 'NKJM',
    modifiedWhen: 1545164269202,
    type: customerTypes[0],
  },
  {
    id: 5,
    title: 'Mr',
    firstName: 'Ayrton',
    firstNameMetaphone: 'ARTN',
    lastName: 'Senna',
    lastNameMetaphone: 'SN',
    modifiedWhen: 1545064269202,
    type: customerTypes[0],
  },
  {
    id: 4,
    title: 'Mr',
    firstName: 'Gerhard',
    firstNameMetaphone: 'JRHRT',
    lastName: 'Berger',
    lastNameMetaphone: 'BRJR',
    modifiedWhen: 1544964269202,
    type: customerTypes[0],
  },
  {
    id: 3,
    title: 'Mr',
    firstName: 'Stefano',
    firstNameMetaphone: 'STFN',
    lastName: 'Modena',
    lastNameMetaphone: 'MTN',
    modifiedWhen: 1544864269202,
    type: customerTypes[2],
  },
  {
    id: 2,
    title: 'Mr',
    firstName: 'Nigel',
    firstNameMetaphone: 'NJL',
    lastName: 'Mansell',
    lastNameMetaphone: 'MNSL',
    modifiedWhen: 1544764269202,
    type: customerTypes[2],
  },
  {
    id: 1,
    title: 'Mr',
    firstName: 'Riccardo',
    firstNameMetaphone: 'RKKRT',
    lastName: 'Patrese',
    lastNameMetaphone: 'PTRS',
    modifiedWhen: 1544664269202,
    type: customerTypes[0],
  }
];

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};
