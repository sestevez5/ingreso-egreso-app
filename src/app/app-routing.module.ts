import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EstadisticaComponent } from './components/ingreso-egreso/estadistica/estadistica.component';
import { IngresoEgresoComponent } from './components/ingreso-egreso/ingreso-egreso.component';
import { DetalleComponent } from './components/ingreso-egreso/detalle/detalle.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '',
    loadChildren: () => import('./components/ingreso-egreso/ingreso-egreso.module')
    .then (m => m.IngresoEgresoModule)
  },
  { path: '**', redirectTo: ''}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
