import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

import Swal from 'sweetalert2'
import { Store, On } from '@ngrx/store';
import { AppState } from 'src/app/AppState/app.reducer';
import { isLoading, stopLoading } from 'src/app/AppState/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  cargando: boolean = false;
  uiSubscription: Subscription;

  constructor( 
    private fb: FormBuilder, 
    private auth: AuthService,
    private store: Store<AppState>, 
    private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
    

    this.uiSubscription = this.store.select('ui')
    .subscribe(
      ui => {
          this.cargando = ui.isLoading;
      }
    )
  }

  ngOnDestroy() {

    this.uiSubscription.unsubscribe();
  }

  onLogin() {

    if (this.loginForm.invalid) {return;}

    this.store.dispatch(isLoading());
    // Swal.fire({
    //   title: 'Espere, por favor.',

    //   onBeforeOpen: () => {
    //     Swal.showLoading()
    //   }
    // });

    const { correo, password} = this.loginForm.value;
    this.auth.loginUsuario( correo, password)
    .then(
      credenciales => {
        //Swal.close();
        this.store.dispatch(stopLoading());
        this.router.navigate(['/']);
      }
    )
    .catch( err => {
      this.store.dispatch(stopLoading());
      // Swal.fire({
      // icon: 'error',
      // title: 'Oops...',
      // text: err.message,

      // })
    }
    
    );

  }

}
