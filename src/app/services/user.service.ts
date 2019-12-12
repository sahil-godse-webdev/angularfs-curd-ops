import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  usersCollection: AngularFirestoreCollection<User>;
  users: Observable<User[]>;
  constructor( public afs: AngularFirestore) { 
    this.usersCollection= this.afs.collection('users',ref=> ref.orderBy('name','asc'));
    this.users = this.usersCollection.valueChanges();
  }

  getUsers(){
    return this.users;
  }

  addUser(user: User){
    this.usersCollection.add(user);
  }
}
