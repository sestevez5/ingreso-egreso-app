import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

import Swal from 'sweetalert2'
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/AppState/app.reducer';
import { Store } from '@ngrx/store';
import { isLoading, stopLoading } from 'src/app/AppState/ui.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit, OnDestroy {

  registroForm: FormGroup;
  cargando: boolean = false;
  uiSubscription: Subscription;




  constructor(  private fb: FormBuilder,
                private authService:  AuthService,
                private store: Store<AppState>,
                private router: Router
                ) { }

  ngOnInit(): void {
    this.registroForm = this.fb.group( {
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
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


  crearUsuario() {

    if ( this.registroForm.invalid) {return}
    this.store.dispatch(isLoading());

    const { nombre, correo, password } = this.registroForm.value;

    this.authService.crearUsuario( nombre, correo, password)
    .then(
      credenciales => {
        this.store.dispatch(stopLoading());
        this.router.navigate(['/'])
      }
    )
    .catch(err => {
      this.store.dispatch(stopLoading());
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.message,
  
      })
    })

  }

}
