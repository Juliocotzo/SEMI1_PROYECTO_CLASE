import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RecetasService} from '../../services/recetas/recetas.service';
import {Auth} from '../../models/auth';
import {UserPhoto} from "../../models/user-photo";
import {UserId} from "../../models/user-id";
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

  Receta:any = {};
  Photo: string;

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

  getReceta(id: string){
    this.ID.id = id;
    console.log(this.ID);
    this.recetasService.getReceta(this.ID).subscribe(
      res => {
        console.log(res);
        this.Receta = res;
        this.Photo = this.Receta.data.Items[0].photo.S;
        console.log(this.Receta.data.Items[0].photo.S);
      }, error => console.log(error)
    );

  }

}
