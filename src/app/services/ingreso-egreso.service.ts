import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { AuthService } from './auth.service';
import Swal from 'sweetalert2';



@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {



  constructor(  private firestore: AngularFirestore,
                private authService: AuthService,
                ) { }

  crearIngresoEgreso( ingresoEgreso: IngresoEgreso){


    return this.firestore.doc(`${ this.authService.currentUser.uid }/ingresos-egresos`)
      .collection('movimientos')
      .add( {...ingresoEgreso });
      
      
      
  }
}
