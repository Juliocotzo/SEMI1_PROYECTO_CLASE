import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RecetasService} from '../../services/recetas/recetas.service';
import {Auth} from '../../models/auth';
import {UserId} from '../../models/user-id';
import {Imagen} from '../../models/imagen';
import {Receta} from '../../models/receta';
import {MedicinaDescripcion} from '../../models/MedicinaDescripcion';

@Component({
  selector: 'app-receta',
  templateUrl: './receta.component.html',
  styleUrls: ['./receta.component.css']
})
export class RecetaComponent implements OnInit {


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recetasService: RecetasService) {
  }


  userLocalStorage: Auth = {
    nombre_completo: '',
    usuario: '',
    contrasenia: ''
  };

  ID: UserId = {
    id: ''
  };

  imagenReceta: Imagen = {
    imagen: ''
  };
  recetaAnalisis: Receta = {
    receta: ''
  };
  Receta: any = {};
  Photo: string;
  RecetaText: string;
  RecetaBool = false;
  Analisis = false;
  RecetaAnalisis: any = {};


  recetaDescirpcion: MedicinaDescripcion = {
    medicina: '',
    fuerza: '',
    dosis: '',
    modo: '',
    frecuencia: ''

  }

  ngOnInit() {
    if (localStorage.getItem('usuario') != null) {
      this.userLocalStorage = JSON.parse(localStorage.getItem('usuario'));
      const id = this.route.snapshot.paramMap.get('id');
      this.getReceta(id);
    } else {
      console.log('ACCESO DENEGADO');
      this.router.navigate(['/login']);
    }
  }

  getReceta(id: string) {
    this.Photo = `https://proyecto-julio-recetas.s3.amazonaws.com/${this.userLocalStorage.usuario}-${id}.jpeg`;
    this.imagenReceta.imagen = `${this.userLocalStorage.usuario}-${id}.jpeg`;
    this.recetasService.getTextReceta(this.imagenReceta).subscribe(
      res => {
        this.Receta = res;
        this.RecetaText = this.Receta.texto;
        console.log(this.RecetaText);
        if (this.RecetaText === undefined) {
          this.RecetaBool = true;
        }
        this.recetaAnalisis.receta = this.RecetaText;
      }, error => console.log(error)
    );

    // imagen: ""
  }


  analizarReceta() {

    this.recetasService.getAnalisis(this.recetaAnalisis).subscribe(
      res => {
        this.RecetaAnalisis = res;
        console.log(JSON.stringify(this.RecetaAnalisis));
        this.RecetaAnalisis.data.Entities.forEach(element => {
            console.log(element.Text);
            this.recetaDescirpcion.medicina = element.Text;
            element.Attributes.forEach(element2 => {
                console.log(element2.Text);
                if (element2.RelationshipType === "STRENGTH") {
                  this.recetaDescirpcion.fuerza = element2.Text;
                } else if (element2.RelationshipType === "DOSAGE") {
                  this.recetaDescirpcion.dosis = element2.Text;
                } else if (element2.RelationshipType === "ROUTE_OR_MODE") {
                  this.recetaDescirpcion.modo = element2.Text;
                } else if (element2.RelationshipType === "FREQUENCY") {
                  this.recetaDescirpcion.frecuencia = element2.Text;
                }

              }
            );
          }
        );
      }, error => console.log(error)
    );
    this.Analisis = true;
  }
}
