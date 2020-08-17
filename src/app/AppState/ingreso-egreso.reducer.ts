import * as ingresoRegresoActions from './ingreso-egreso.actions';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { createReducer,on } from '@ngrx/store';

export interface State {
    items: IngresoEgreso[]; 
}

export const initialState: State = {
  items: []
}

const _ingresoEgresoReducer = createReducer(
    initialState,

    on(
        ingresoRegresoActions.setItems,
        (state, { items }) => ( { ...state, items: [...items]})
    ),

    on(
        ingresoRegresoActions.unsetItems,
        (state) => ( { ...state, items: []})
    ),




); // Fin _ingresoEgresoReducer
       
export function ingresoEgresoReducer(state, action) {
    return _ingresoEgresoReducer(state, action);
}