import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

import { fakeBackendProvider  } from './fakebackend.interceptor';

import { CustomersModule } from './customers/customers.module';

import { CustomersComponent } from './customers/customers.component';
import { CustomerAddComponent } from './customers/customer-add/customer-add.component';

const routes: Routes = [
  {
    path: 'customers',
    component: CustomersComponent,
  },
  {
    path: 'customer-add',
    component: CustomerAddComponent,
  }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      routes,
    ),
  CustomersModule
  ],
  providers: [fakeBackendProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
