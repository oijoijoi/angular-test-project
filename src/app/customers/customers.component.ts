import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

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
  closeResult: string;

  constructor(
    private router: Router,
    private service: CustomersBackendService,
    private modalService: NgbModal,
  ) { }

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

  deleteId(id) {
    this.service.deleteCustomer(id).subscribe(data => {
      this.customers = data;
    });
    this.clearFilter();
  }

  open(content, id) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if (result === 'delete') {
        console.log('delete' + id);
        this.deleteId(id);
      }
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(this.closeResult);
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

}
