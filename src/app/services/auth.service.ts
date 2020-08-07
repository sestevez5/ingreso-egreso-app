import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';
import { AngularFirestore } from '@angular/fire/firestore';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth,
              private firestore: AngularFirestore) { }

  initAuthListener() {
    this.auth.authState.subscribe(
      fuser => {
        console.log(fuser);
      }
    )
  }

  crearUsuario(nombre:string, email:string, password: string) {
   return this.auth.createUserWithEmailAndPassword(email,password).then(
     fbUser => {
       const newUser = new Usuario(fbUser.user.uid, nombre, email);

       return this.firestore.doc(`${ fbUser.user.uid }/usuario`)
       .set( newUser );

     }
   );
  }

  loginUsuario(email: string, password: string )
  {
    return this.auth.signInWithEmailAndPassword(email,password);
  }

  logout() {
    return this.auth.signOut();
  }

  isAuth() {
    return this.auth.authState.pipe(
      map( 
        fbuser => fbuser != null
      )
    );
  }
}
