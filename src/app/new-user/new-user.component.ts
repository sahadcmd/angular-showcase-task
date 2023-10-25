import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { UserDataService } from '../user-data.service';
import { Router } from '@angular/router';

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
  userSubmitForm: boolean = false;

  constructor(private userData: UserDataService, private router: Router) {}

  // form validators
  ngOnInit() {
    this.formData = new FormGroup({
      id: new FormControl(this.getDraftValue('id'), [Validators.required, idValidator()]),
      name: new FormControl(this.getDraftValue('name'), Validators.required),
      email: new FormControl(this.getDraftValue('email'), [Validators.required, Validators.email]),
      gender: new FormControl(this.getDraftValue('gender', 'male')),
      status: new FormControl(this.getDraftValue('status', 'active')),
    });

    // Load draft data if it exists
    this.restoreDraft();
  }

  ngOnDestroy() {
    // Save draft data before leaving the component
    this.saveDraft();
  }

  onSubmit(formData: any) {
    this.userSubmitForm = true;

    // Update the 'status' form control value based on the checkbox state
    if (this.formData.get('status').value) {
      this.formData.get('status').setValue('active');
    } else {
      this.formData.get('status').setValue('inactive');
    }

    if (this.formData.valid) {
      // Adding data to the database through a service
      this.userData.saveUsers(this.formData.value).subscribe((result) => {
        console.warn(result);
        // Reset the form after submission
        this.formData.reset();
        // Clear draft data
        this.clearDraft();
      });
    }
  }

  // Helper function to retrieve draft data from local storage
  private getDraftValue(key: string, defaultValue: any = null) {
    const draftData = localStorage.getItem('userFormDraft');
    if (draftData) {
      const parsedData = JSON.parse(draftData);
      return parsedData[key] || defaultValue;
    }
    return defaultValue;
  }

  // Helper function to save draft data to local storage
  private saveDraft() {
    localStorage.setItem('userFormDraft', JSON.stringify(this.formData.value));
  }

  // Helper function to restore draft data from local storage
  private restoreDraft() {
    const draftData = this.getDraftValue('formData');
    if (draftData) {
      this.formData.setValue(draftData);
    }
  }

  // Helper function to clear draft data from local storage
  private clearDraft() {
    localStorage.removeItem('userFormDraft');
  }
}
