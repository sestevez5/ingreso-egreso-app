import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IngresoEgreso } from '../../models/ingreso-egreso.model';
import { IngresoEgresoService } from '../../services/ingreso-egreso.service'
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/AppState/app.reducer';
import * as ui from '../../AppState/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: [
  ]
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  ingresoForm: FormGroup;
  tipo: string = 'ingreso';
  cargando : boolean = false;
  loadingSubscription: Subscription;

  constructor(  private fb: FormBuilder,
                private ingresoRegresoService: IngresoEgresoService,
                private store: Store<AppState> ) { }

  ngOnInit(): void {

    this.loadingSubscription = this.store.select('ui')
      .subscribe(
        ui => this.cargando = ui.isLoading
      );

    this.ingresoForm = this.fb.group({
      descripcion: ['', Validators.required],
      monto: ['', Validators.required]
    });

  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }

  onGuardar(){



    if (this.ingresoForm.invalid) {return;}

    this.store.dispatch(ui.isLoading());

    const { descripcion, monto } = this.ingresoForm.value;

    const ingresoEgreso = new IngresoEgreso( descripcion, monto, this.tipo);

    this.ingresoRegresoService.crearIngresoEgreso(ingresoEgreso)
    .then(
      (ref) => {
        
        this.ingresoForm.reset();
        this.store.dispatch(ui.stopLoading());
        Swal.fire('Registro creado', descripcion, 'success');
      }
    )
    .catch( err =>
      {
        this.store.dispatch(ui.stopLoading());

        Swal.fire('Error', err.message , 'error');
      }
    );

  } // Fin onGuardar
      
}
