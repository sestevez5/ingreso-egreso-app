import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor( private fb: FormBuilder, private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]

    })
  }

  onLogin() {

    if (this.loginForm.invalid) {return;}

    const { correo, password} = this.loginForm.value;
    this.auth.loginUsuario( correo, password).then(
      credenciales => {
        console.log(credenciales);
        this.router.navigate(['/']);
      }
    )
    .catch( err => console.error(err));

  }

}
