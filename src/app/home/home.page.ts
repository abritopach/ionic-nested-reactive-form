import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup, FormArray, Form } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  currentYear = new Date().getFullYear();
  userProfileForm: FormGroup;

  userProfile = {
    name: 'Jhon Sky',
    addresses: [
      {street: 'Calle Bernardino Obregón', phonenumber: [{number: 9845612378}, {number: 1589635015}]},
      {street: 'Calle Velázquez', phonenumber: [{number: 7412563474 }, {number: 1578963248}]
    }]
  };

  constructor(private formBuilder: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
    this.userProfileForm.patchValue(this.userProfile);
    // Patch form array addresses.
    this.userProfileForm.controls.addresses = this.formBuilder.array(this.userProfile.addresses.map(address => {
      const group = this.initAddress();

      // Patch form array phones.
      group.controls.phonenumber = this.formBuilder.array(
        address.phonenumber.map(phone => {
          const g = this.initNumber();
          g.patchValue(phone);
          return g;
      }));

      group.patchValue(address);

      return group;
    }));

    /*
    console.log(this.userProfileForm.value);
    console.log(this.getStreet(0));
    console.log('number1', this.getNumber(0, 0));
    console.log('number2', this.getNumber(0, 1));
    */
  }

  createForm() {
    this.userProfileForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      addresses: this.formBuilder.array([this.initAddress()])
    });
    // console.log(this.userProfileForm.controls.addresses);
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
    console.log(this.userProfileForm.getRawValue());
  }

  getStreet(index) {
    return ((this.userProfileForm.get('addresses') as FormArray).at(index) as FormGroup).get('street');
  }

  getNumber(index1, index2) {
    return ((((this.userProfileForm.get('addresses') as FormArray).at(index1) as FormGroup)
    .get('phonenumber') as FormArray).at(index2) as FormGroup).get('number');
  }

  addAddress() {
    const control = this.userProfileForm.controls.addresses as FormArray;
    control.push(this.initAddress());
  }

  removeAddress(i: number) {
    const control = this.userProfileForm.controls.addresses as FormArray;
    control.removeAt(i);
  }

}
