import { Injectable } from '@angular/core';

//Firestore
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

//rxjs
import { map } from 'rxjs/operators';

//ngrx
import { Store } from '@ngrx/store';
import { AppState } from '../AppState/app.reducer';
import * as authActions from '../AppState/auth.actions';
import { Subscription } from 'rxjs';

//app
import { Usuario } from '../models/usuario.model';
import { unsetItems } from '../AppState/ingreso-egreso.actions';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSubscription: Subscription;
  private _currentUser: Usuario;  //Representa el usuario que está conectado en la aplicación. Null, si no hay usuario conectado.

  get currentUser() {
    return this._currentUser;
  }

  constructor(  private auth: AngularFireAuth,
              private firestore: AngularFirestore,
                private store: Store<AppState>) { }

              
  initAuthListener() {

    this.auth.authState.subscribe(
      fuser => {
      
        if (fuser) 
        {
          this.userSubscription =  this.firestore.doc(`${ fuser.uid }/usuario`).valueChanges()
          .subscribe(

            (firestoreUser: any) => {
           
              const user = Usuario.fromFirebase(firestoreUser);
              this._currentUser = user;
              this.store.dispatch( authActions.setUser( { user }));
        

            }
          )
         
        }
        else {

          if(this.userSubscription) this.userSubscription.unsubscribe();
          this._currentUser = null;
          this.store.dispatch( authActions.unSetUser());
          this.store.dispatch( unsetItems());

        } // Fin if

      } // fsuer => {}

    ) // Fin subscribe
    
  } // fin InitAuthListener

  crearUsuario(nombre:string, email:string, password: string) {
   return this.auth.createUserWithEmailAndPassword(email,password)
   .then(
     fbUser => {
       const newUser = new Usuario(fbUser.user.uid, nombre, email);

       return this.firestore.doc(`${ fbUser.user.uid }/usuario`)
       .set( {...newUser} );
       
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
