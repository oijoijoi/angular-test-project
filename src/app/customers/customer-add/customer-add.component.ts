import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { CustomersBackendService } from '../customers.backend.service';
import { CustomerType } from '../models/customer-type';

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.css']
})
export class CustomerAddComponent implements OnInit {
  customerAddFormGroup: FormGroup;
  titleFormControl: FormControl;
  firstNameFormControl: FormControl;
  lastNameFormControl: FormControl;
  typeFormControl: FormControl;

  constructor(
    private service: CustomersBackendService,
    private router: Router) { }

  private customerTypes: CustomerType[];

  ngOnInit() {
    this.service.getCustomerTypes().subscribe(data => {
      this.customerTypes = data;
    });

    this.titleFormControl = new FormControl('', {
      validators: Validators.required
    });
    this.firstNameFormControl = new FormControl('', {
      validators: Validators.required
    });
    this.lastNameFormControl = new FormControl('', {
      validators: Validators.required
    });
    this.typeFormControl = new FormControl('', {
      validators: Validators.required
    });

    this.customerAddFormGroup = new FormGroup({
      title: this.titleFormControl,
      firstName: this.firstNameFormControl,
      lastName: this.lastNameFormControl,
      type: this.typeFormControl,
    });
  }

  createCustomer() {
    this.service.createCustomer(
      this.titleFormControl.value,
      this.firstNameFormControl.value.trim(),
      this.lastNameFormControl.value.trim(),
      this.typeFormControl.value,
    ).subscribe(() => this.router.navigate(['customers']));
  }

}
