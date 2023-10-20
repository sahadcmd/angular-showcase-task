import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserDataService } from '../user-data.service';

interface User {
  id: number;
  name: string;
  email: string;
  gender: string;
  status: string;
}

@Component({
    selector: 'app-user-edit',
    templateUrl: './user-edit.component.html',
    styleUrls: ['./user-edit.component.css']
})

export class UserEditComponent implements OnInit {
    userId: string;
    userForm: FormGroup;

    constructor(
        private route: ActivatedRoute,
        private userDataService: UserDataService,
        private formBuilder: FormBuilder
    ) {
      this.userForm = this.formBuilder.group({
        id: [''], // Initialize with an empty string
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        gender: [''],
        status: ['']
      });
    }
  
    ngOnInit(): void {
      this.route.paramMap.subscribe(params => {
        this.userId = params.get('id');
        if (this.userId) {
          this.userDataService.getUserById(this.userId).subscribe((user: User) => {
            this.userForm.setValue({
              id: user.id,
              name: user.name,
              email: user.email,
              gender: user.gender,
              status: user.status
            });
          });
        }
      });
    }        
}
