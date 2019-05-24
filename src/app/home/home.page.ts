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
    addresses: [
      {street: 'nehru nagar', phonenumber: [{number: 9845612378}, {number: 1589635015}]},
      {street: 'gandhi nagar', phonenumber: [{number: 7412563474 }, {number: 1578963248}]
    }]
  };

  constructor(private formBuilder: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
    this.userProfileForm.patchValue(this.userProfile);
    this.userProfileForm.controls.addresses = this.formBuilder.array(this.userProfile.addresses.map(address => {
      const group = this.initAddress();

      const phonesControl = group.get('phonenumber') as FormArray;
      console.log('phonesControl', phonesControl);

      // phonesControl.removeAt(0);
      address.phonenumber.map(phone => {
        console.log('phone', phone);
        phonesControl.push(
          this.formBuilder.group(phone)
        );
      });

      group.patchValue(address);

      console.log('group', group);

      return group;
    }));
    console.log(this.userProfileForm.value);

    console.log(this.getStreet(0));
    console.log('number1', this.getNumber(0, 0));
    console.log('number2', this.getNumber(0, 1));

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
      phonenumber: this.formBuilder.array([this.initNumber()])
    });
  }

  initNumber() {
    return this.formBuilder.group({
      number: ['', Validators.required]
    });
  }

  userProfileFormSubmit() {
    console.log(this.userProfileForm.value);
  }

  getStreet(index) {
    return ((this.userProfileForm.get('addresses') as FormArray).at(index) as FormGroup).get('street');
  }

  getNumber(index1, index2) {
    return ((((this.userProfileForm.get('addresses') as FormArray).at(index1) as FormGroup)
    .get('phonenumber') as FormArray).at(index2) as FormGroup).get('number');
  }

}