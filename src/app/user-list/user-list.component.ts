import { Component } from '@angular/core';
import { UserDataService } from '../user-data.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {

  
  users:any;
  constructor(private userData:UserDataService){
    this.userData.users().subscribe(
      (data) => {
        this.users=data;
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
  }
}
