import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppState } from 'src/app/AppState/app.reducer';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from 'src/app/services/ingreso-egreso.service';
import * as ingresoEgresoActions from '../../AppState/ingreso-egreso.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit, OnDestroy {

  currentUser: Subscription;
  ingresossRegresosSub: Subscription;


  constructor(  private store: Store<AppState>,
                private ingresoEgresoService: IngresoEgresoService) { }

  ngOnInit(): void {

    this.currentUser = this.store.select('currentUser')
   
      .subscribe(

        user =>
        {

          
          if (!user.user) {
            this.store.dispatch(ingresoEgresoActions.unsetItems());

          }
          else
          {
            this.ingresossRegresosSub = this.ingresoEgresoService.initIngresosEgresosListener(user.user.uid)
            .subscribe(
              ingresosegresosfb => 
              {
                this.store.dispatch(ingresoEgresoActions.setItems({ items: ingresosegresosfb}));
              }
            );
          }
        } 

      )
  }

  ngOnDestroy() {

    this.currentUser.unsubscribe();
    this.ingresossRegresosSub.unsubscribe();
  }

 

}
