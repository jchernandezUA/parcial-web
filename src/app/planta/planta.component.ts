import { Component,
   Inject,
   OnInit } from '@angular/core';
import { PlantaService } from './planta.service';
import { Planta } from './planta';

@Component({
  selector: 'app-planta',
  templateUrl: './planta.component.html',
  styleUrls: ['./planta.component.css']
})
export class PlantaComponent implements OnInit {

  plantas: Array<Planta> = [];

  constructor(private plantaService: PlantaService) { }

  ngOnInit() {
    this.getPlantas()
  }

  getPlantas() {
    this.plantaService.getPlantas().subscribe(plantas => {
      this.plantas = plantas.map((it) => {
        
        return new Planta(
          it["id"],
          it["nombre_comun"],
          it["nombre_cientifico"],
          it["tipo"],
          it["altura_maxima"],
          it["clima"],
          it["sustrato_siembra"])
      })
    });
  }

  filtroTipo(tipo: string): Planta[] {
    return this.plantas.filter((p) => {return p.tipo == tipo})
  }

  getInterior(): number {
    return this.filtroTipo("Interior").length
  }

  getExterior(): number {
    return this.filtroTipo("Exterior").length
  }


}
