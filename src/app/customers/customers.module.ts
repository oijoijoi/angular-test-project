import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { CustomersComponent } from './customers.component';
import { CustomerAddComponent } from './customer-add/customer-add.component';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';
import { CustomersBackendService} from './customers.backend.service'

@NgModule({
  declarations: [CustomersComponent, CustomerAddComponent, CustomerEditComponent],
  providers: [CustomersBackendService],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CustomersModule { }
