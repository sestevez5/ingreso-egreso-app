import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/AppState/app.reducer';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';

import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: [
  ]
})
export class EstadisticaComponent implements OnInit {

  estadistica: { numeroIngresos: number, numeroEgresos: number, totalIngresos:number, totalEgresos:number}={ numeroIngresos: 0, numeroEgresos: 0, totalIngresos:0, totalEgresos:0};
  
  
  public doughnutChartLabels: Label[] = ['Ingresos','Egresos'];
  public doughnutChartData: MultiDataSet = [
    [0,0]
  ];
  



  constructor(
    private store: Store<AppState>
  ) { }



  ngOnInit(): void {
    this.store.select('ingresosEgresos')
      .subscribe(
        ({items}) =>
        {
          this.generarEstadistica( items )
        }
      )
  }

  generarEstadistica( items: IngresoEgreso[]) {

    const reducer = (
      nuevoValor: { numeroIngresos: number, numeroEgresos: number, totalIngresos:number, totalEgresos: number} , 
      valorActual: IngresoEgreso,
      ) => {

 
      if( valorActual.tipo === 'ingreso' )
      {
        nuevoValor.numeroIngresos ++;
        nuevoValor.totalIngresos += valorActual.monto;
      }
      else 
      {
        nuevoValor.numeroEgresos ++;
        nuevoValor.totalEgresos += valorActual.monto;
      };

      return nuevoValor;
      
      
    }

    this.estadistica = items.reduce( reducer, { numeroIngresos: 0, numeroEgresos: 0, totalIngresos:0, totalEgresos:0});
    this.doughnutChartData = [ [this.estadistica.totalIngresos, this.estadistica.totalEgresos]];
  
  }
}
