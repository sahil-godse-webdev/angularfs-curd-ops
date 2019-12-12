import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
 
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  user: User= {
    name: '',
    email: '',
    phone: ''
  }
  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  onSubmit(){
    if(this.user.name!=''&& this.user.email!='' && this.user.phone!=''){
      this.userService.addUser(this.user);
      this.user.name= '';
      this.user.email='';
      this.user.phone= '';
    }
    else{
      this.user.name= '';
      this.user.email='';
      this.user.phone= '';
    }
  }

}
