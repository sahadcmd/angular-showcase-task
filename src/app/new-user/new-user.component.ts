import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { UserDataService } from '../user-data.service';
import { Router } from '@angular/router';
import { DraftService } from '../services/draft.service';


// Custom Validator Function for ID
function idValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;

    if (value == null || value === '') {
      return { required: true };
    }

    if (value.toString().length !== 7) {
      return { invalidLength: true };
    }

    if (isNaN(value)) {
      return { notNumber: true };
    }

    return null;
  };
}


@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {

  formData: FormGroup;
  draftData: any;

  constructor(private userData: UserDataService, private router: Router, private draftService: DraftService){
  }

  // form validators
  ngOnInit(){
    this.formData = new FormGroup({
      id: new FormControl(null, [Validators.required, idValidator()]),
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      gender: new FormControl('male'),
      status: new FormControl('active')
    });

    // Load draft data if it exists
    this.draftData = this.draftService.getDraft();
    if (this.draftData) {
      this.formData.setValue(this.draftData);
    }
  }

  ngOnDestroy() {
    // Save draft data before leaving the component
    if (this.formData.dirty) {
      this.draftService.saveDraft(this.formData.value);
    } else {
      this.draftService.clearDraft();
    }
  }

  

  onSubmit(formData: any){
    // Update the 'status' form control value based on the checkbox state
    if (this.formData.get('status').value) {
      this.formData.get('status').setValue('active');
    } else {
      this.formData.get('status').setValue('inactive');
    }

    // Adding data to database through service
    this.userData.saveUsers(this.formData.value).subscribe((result) => {
      console.warn(result);

      // Reset the form after submission
      this.formData.reset();
    });
  }
}