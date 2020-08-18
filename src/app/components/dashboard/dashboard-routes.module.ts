import { NgModule } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { IngresoEgresoComponent } from '../ingreso-egreso/ingreso-egreso.component';
import { EstadisticaComponent } from '../ingreso-egreso/estadistica/estadistica.component';
import { DetalleComponent } from '../ingreso-egreso/detalle/detalle.component';
import { Routes, Router, RouterModule } from '@angular/router';
import { } from '../../services/auth.guard';


 const rutashijas: Routes = [
  { path: '',
  component: DashboardComponent,
  children: [
    { path: '', component: EstadisticaComponent },
    { path: 'ingreso-egreso', component: IngresoEgresoComponent },
    { path: 'detalle', component: DetalleComponent }
  ],
  //canActivate: [ AuthGuard] 
},
 ]
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(rutashijas)
  ],
  exports: [
    RouterModule
  ]
})


export class DashboardRoutesModule { }
