import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  usersCollection: AngularFirestoreCollection<User>;
  users: Observable<User[]>;
  userDoc: AngularFirestoreDocument<User>;

  constructor( public afs: AngularFirestore) { 
    
    this.usersCollection = afs.collection<User>('users',ref=> ref.orderBy('name','asc'));
    // .snapshotChanges() returns a DocumentChangeAction[], which contains
    // a lot of information about "what happened" with each change. If you want to
    // get the data and the id use the map operator.
    this.users = this.usersCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as User;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    
    /*this.usersCollection= this.afs.collection('users',ref=> ref.orderBy('name','asc'));
    this.users= this.afs.collection('users').snapshotChanges().map(changes=>{
      return changes.map(a=> {
        const data= a.payload.doc.data() as User;
        data.id= a.payload.doc.id;
        return data;
      })
    })*/
  }
  

  getUsers(){
    return this.users;
  }

  addUser(user: User){
    this.usersCollection.add(user);
  }

  deleteUser(user: User){
    console.log(user.name);
    this.userDoc= this.afs.doc(`users/${user.id}`);
    this.userDoc.delete();
  }
  
  updateUser(user: User){
    //alert(user.name);
    this.userDoc= this.afs.doc(`users/${user.id}`);
    this.userDoc.update(user);
  }
}
