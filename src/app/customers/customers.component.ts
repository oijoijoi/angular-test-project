import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { CustomersBackendService } from './customers.backend.service';

import { Customer } from './models/customer';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  customersFilterFormGroup: FormGroup;
  firstNameFilterFormControl: FormControl;
  lastNameFilterFormControl: FormControl;

  constructor(
    private router: Router,
    private service: CustomersBackendService) { }

  private customers: Customer[];

  ngOnInit() {
    this.service.getCustomers().subscribe(data => {
      this.customers = data;
    });

    this.firstNameFilterFormControl = new FormControl();
    this.lastNameFilterFormControl = new FormControl();
    this.customersFilterFormGroup = new FormGroup({
      firstNameFilter: this.firstNameFilterFormControl,
      lastNameFilter: this.lastNameFilterFormControl,
    });
  }

  goToNewCustomer() {
    this.router.navigate(['customer-add']);
  }

  setFilter() {
    if (this.firstNameFilterFormControl.value || this.lastNameFilterFormControl.value) {
      this.service.getCustomersByFilter(this.firstNameFilterFormControl.value, this.lastNameFilterFormControl.value).subscribe(data => {
        this.customers = data;
      });
    } else {
      this.service.getCustomers().subscribe(data => {
        this.customers = data;
      });
    }
  }

  clearFilter() {
    this.customersFilterFormGroup.reset();
    this.service.getCustomers().subscribe(data => {
      this.customers = data;
    });
  }

  setOnEdit(id) {
    console.log(id);
  }

  setOnDelete(id) {
    this.service.deleteCustomer(id).subscribe(data => {
      this.customers = data;
    });
  }
}
