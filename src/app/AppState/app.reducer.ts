import { ActionReducerMap } from '@ngrx/store';
import * as ui  from './ui.reducer';
import * as auth  from './auth.reducer';
import * as ingresoEgreso from './ingreso-egreso.reducer';



export interface AppState {
   ui: ui.State,
   currentUser: auth.State,
   ingresosEgresos: ingresoEgreso.State
}



export const appReducers: ActionReducerMap<AppState> = {
    ui: ui.uiReducer,
    currentUser: auth.authReducer,
    ingresosEgresos: ingresoEgreso.ingresoEgresoReducer
}