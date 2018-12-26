import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { CustomersComponent } from './customers.component';
import { CustomerAddComponent } from './customer-add/customer-add.component';
import { CustomersBackendService} from './customers.backend.service';
import { CustomersWelcomeComponent } from './customers-welcome/customers-welcome.component';

@NgModule({
  declarations: [
    CustomersComponent,
    CustomerAddComponent,
    CustomersWelcomeComponent,
  ],
  providers: [
    CustomersBackendService
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
  ],
})
export class CustomersModule { }
