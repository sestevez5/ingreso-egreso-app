import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetalleComponent} from './detalle/detalle.component';
import { EstadisticaComponent} from './estadistica/estadistica.component';
import { IngresoEgresoComponent} from './ingreso-egreso.component';
import { OrdeningresoPipe } from '../../pipes/ordeningreso.pipe';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { SharedModule } from '../shared/shared.module';

import { DashboardRoutesModule } from '../dashboard/dashboard-routes.module';




@NgModule({
  declarations: [
    DashboardComponent,
    IngresoEgresoComponent,
    EstadisticaComponent,
    DetalleComponent,
    OrdeningresoPipe


  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    ChartsModule,
    DashboardRoutesModule
  ]
})
export class IngresoEgresoModule { }
