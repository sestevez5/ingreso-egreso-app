import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/AppState/app.reducer';
import { Usuario } from 'src/app/models/usuario.model';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit, OnDestroy {

  nameUser: string;

  currentUserSub: Subscription;

  constructor(private auth: AuthService,
              private router: Router,
              private store: Store<AppState>) { }

  ngOnInit(): void {

    this.currentUserSub = this.store.select('currentUser')
      .pipe(
        filter( user => user.user != null)
      )
      .subscribe( user =>
        {
          this.nameUser = user.user.nombre;
        })
  }

  ngOnDestroy() {
    this.currentUserSub.unsubscribe();
  }

  onClick(){
    this.auth.logout()
    .then( 
      () => {
        this.router.navigate(['/login']);
      }

    )
  }

}
