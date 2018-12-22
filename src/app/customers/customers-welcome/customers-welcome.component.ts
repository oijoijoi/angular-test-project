import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customers-welcome',
  templateUrl: './customers-welcome.component.html',
  styleUrls: ['./customers-welcome.component.css']
})
export class CustomersWelcomeComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
  }

  goToCustomersList() {
    this.router.navigate(['customers']);
  }

}
