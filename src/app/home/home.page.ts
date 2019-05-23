import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  userProfileForm: FormGroup;

  userProfile = {
    name: 'abc',
    addressess: [
      {street: 'nehru nagar', phonenumber: [{number: 9845612378}, {number: 1589635015}]},
      {street: 'gandhi nagar', phonenumber: [{number: 7412563474 }, {number: 1578963248}]
    }]
  };

  constructor(private formBuilder: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
    this.userProfileForm.patchValue(this.userProfile);
    this.userProfileForm.controls.addresses = this.formBuilder.array(this.userProfile.addressess.map(address => {
      const group = this.initAddress();

      console.log('group', group);

      group.patchValue(address);

      console.log('group', group.value);

      const phones = address.phonenumber.map(phone => {
        const phoneNumber = this.initNumber();
        phoneNumber.patchValue(phone);
        return phoneNumber;
      });

      console.log(phones);

      group.patchValue({phonenumber: phones});

      console.log('group', group.value);

      return group;
    }));
    console.log(this.userProfileForm.value);
  }

  createForm() {
    this.userProfileForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      addresses: this.formBuilder.array([this.initAddress()])
    });
    console.log(this.userProfileForm.controls.addresses);
  }

  initAddress() {
    return this.formBuilder.group({
      street: ['', Validators.required],
      postcode: [''],
      phonenumber: this.formBuilder.array([this.initNumber()])
    });
  }

  initNumber() {
    return this.formBuilder.group({
      number: ['', Validators.required]
    });
  }

}
