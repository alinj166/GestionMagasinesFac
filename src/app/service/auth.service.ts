import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import firebase from 'firebase/compat';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<firebase.User>
  

  constructor(private fa:AngularFireAuth) { 
    this.user=this.fa.user
  }

  signUp(email,password){
   return this.fa.createUserWithEmailAndPassword(email,password)
  }
  signIn(email,password){
    return this.fa.signInWithEmailAndPassword(email,password)
  }
}
