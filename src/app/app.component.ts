import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  contactForm: FormGroup;
  isFormInvalid: boolean;
  contactsList = [{
    name: 'Admin',
    mobile: '9999999999',
    email: 'admin@xyzcompany.com'
  }];

  ngOnInit(): void {
    // form object for the input fields + using their inbuild validators + concise code
    this.contactForm = new FormGroup({
      name: new FormControl('', [Validators.maxLength(20), Validators.required, Validators.pattern('^[A-Za-z\\s]+$')]),
      mobile: new FormControl('', [Validators.maxLength(10), Validators.required]),
      email: new FormControl('', [Validators.maxLength(40), Validators.email])
    });
  }

  addContract(contact: FormGroup, invalid: boolean): void {
    this.isFormInvalid = invalid;
    if (!this.isFormInvalid) {
      // For On push detection change strategy by creating a new refernce each time rather updating same object
      this.contactsList = [...this.contactsList, (contact && contact.value)];
      // Clear input after sumbitting contact. Button is disabled if form is invalid, thus provding sanity checking
      this.contactForm.reset();
    }
  }

}
