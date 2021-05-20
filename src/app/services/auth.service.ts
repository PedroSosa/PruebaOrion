import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: AngularFireAuth) {}

  getCurrentUser() {
    return this.auth.currentUser;
  }

  login(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  register(email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  forgot(email: string) {
    return this.auth.sendPasswordResetEmail(email);
  }

  logOut() {
    return this.auth.signOut();
  }
}
