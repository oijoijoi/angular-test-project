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
    console.log('setFilter function');
    if (this.firstNameFilterFormControl.value || this.lastNameFilterFormControl.value) {
      console.log('filter');
    } else {
      console.log('no filter');
    }
  }
}
