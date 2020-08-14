import { createAction, props } from '@ngrx/store';
import {  IngresoEgreso } from '../models/ingreso-egreso.model';

export const unsetItems = createAction('[INGRESO-EGRESO] Set Items');
export const setItems = createAction(
    '[INGRESO-EGRESO] Unset Items',
    props<{items: IngresoEgreso[]}>()
);