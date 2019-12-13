import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[];
  editState:boolean = false;
  userToEdit: User;
  
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(users=>
      //console.log(users));
      this.users = users);
  }

  deleteUser(event, user: User){
    this.editState= false;
    this.userService.deleteUser(user);
  }
  
  editUser(event, user: User){
    console.log(user);
    this.editState= true;
    this.userToEdit= user;
  }
  
  updateUser(user: User){
    alert("User Data Updated!");
    //this.userService.deleteUser(this.user);
    //this.userService.addUser(this.user);
    this.userService.updateUser(user);
    this.editState= false;
  }
 
}
