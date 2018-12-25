import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { CustomersBackendService } from './customers.backend.service';

import { Customer } from './models/customer';
import { CustomerType } from './models/customer-type';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  customersFilterFormGroup: FormGroup;
  firstNameFilterFormControl: FormControl;
  lastNameFilterFormControl: FormControl;

  customerEditFormGroup: FormGroup;
  titleEditorFormControl: FormControl;
  firstNameEditorFormControl: FormControl;
  lastNameEditorFormControl: FormControl;
  typeEditorFormControl: FormControl;

  editId: number;
  private isOnEdit = false;

  constructor(
    private router: Router,
    private service: CustomersBackendService,
    private modalService: NgbModal,
  ) { }

  private customers: Customer[];
  private customerTypes: CustomerType[];

  ngOnInit() {
    this.service.getCustomers().subscribe(data => {
      this.customers = data;
    });

    this.service.getCustomerTypes().subscribe(data => {
      this.customerTypes = data;
    });

    this.titleEditorFormControl = new FormControl();
    this.firstNameEditorFormControl = new FormControl();
    this.lastNameEditorFormControl = new FormControl();
    this.typeEditorFormControl = new FormControl();
    this.customerEditFormGroup = new FormGroup({
      titleEditor: this.titleEditorFormControl,
      firstNameEditor: this.firstNameEditorFormControl,
      lastNameEditor: this.lastNameEditorFormControl,
      typeEditor: this.typeEditorFormControl,
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

  goToMainPage() {
    this.router.navigate(['']);
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
    if (!this.isOnEdit) {
      this.isOnEdit = true;
      this.editId = id;
    } else {
      if (this.editId === id) {
        this.isOnEdit = false;
        this.editId = null;
      } else {
        this.editId = id;
      }
    }
    console.log(this.isOnEdit, this.editId);
  }

  saveChanges(title, firstName, lastName, type) {
    const newTitle = this.titleEditorFormControl.value ? this.titleEditorFormControl.value : title;
    const newFirstName = this.firstNameEditorFormControl.value ? this.firstNameEditorFormControl.value.trim() : firstName;
    const newLastName = this.lastNameEditorFormControl.value ? this.lastNameEditorFormControl.value.trim() : lastName;
    const newType = this.typeEditorFormControl.value ? this.typeEditorFormControl.value : type;
    this.service.editCustomer(
      this.editId,
      newTitle,
      newFirstName,
      newLastName,
      newType,
    ).subscribe(data => {
      this.customers = data;
    });
    this.setOnEdit(this.editId);
  }

  deleteId(id) {
    this.service.deleteCustomer(id).subscribe(data => {
      this.customers = data;
    });
    this.clearFilter();
  }

  open(content, id) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      if (result === 'delete') {
        console.log('deleted id = ' + id);
        this.deleteId(id);
      }
    }, (reason) => {
      console.log('Canceled');
    });
  }

}
