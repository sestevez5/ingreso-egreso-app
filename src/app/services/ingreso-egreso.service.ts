import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { AuthService } from './auth.service';
import Swal from 'sweetalert2';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {



  constructor(  private firestore: AngularFirestore,
                private authService: AuthService,
                ) { }

                
  crearIngresoEgreso( ingresoEgreso: IngresoEgreso){
    delete ingresoEgreso.uid;

    return this.firestore.doc(`${ this.authService.currentUser.uid }/ingresos-egresos`)
      .collection('movimientos')
      .add( {...ingresoEgreso });

  }

  initIngresosEgresosListener( uidUser ) {

    return this.firestore.collection(`${ uidUser }/ingresos-egresos/movimientos`).snapshotChanges()
      .pipe(
        map( value => {
          return value.map( (valor:any) => 
            { 
              const datos: any = valor.payload.doc.data();
              return {uid: valor.payload.doc.id, ...datos};
            }

             );
        })
      )
  }

  borrarIngresoEgreso( uidItem: string )
  {
    const uidUsuario = this.authService.currentUser.uid;
    const cadena = `${ uidUsuario }/ingresos-egresos/movimientos/${ uidItem }`;
    console.log(cadena);
    return this.firestore.doc(cadena).delete();
  }
}
