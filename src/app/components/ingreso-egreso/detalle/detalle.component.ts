import { Component, OnInit, OnDestroy } from '@angular/core';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';
import { AppState } from 'src/app/AppState/app.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from 'src/app/services/ingreso-egreso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: [
  ]
})
export class DetalleComponent implements OnInit, OnDestroy {

  ingresosEgresosSub: Subscription;
  ingresosEgresos: IngresoEgreso[] = [];
  constructor(
              private store: Store<AppState>,
              private ingresoegresoService: IngresoEgresoService
  ) { }

  ngOnInit(): void {
    this.ingresosEgresosSub =  this.store.select('ingresosEgresos')
      .subscribe(
        ({ items }) => 
        {
          this.ingresosEgresos = items;
        }
      )
  }

  ngOnDestroy(): void {
    this.ingresosEgresosSub.unsubscribe();
  }

  borrar(uid){

    this.ingresoegresoService.borrarIngresoEgreso(uid)
    .then( resp => 
      {
        Swal.fire('Borrado', 'Ítem borrado', 'success')
      })
    .catch (

      err => 
      {
        Swal.fire('Error', err.message, 'error')
      }


    );
    

  }

}
