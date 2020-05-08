import { Component, OnInit } from '@angular/core';
import {NgxImageCompressService} from 'ngx-image-compress';
import {UploadFoto} from '../../models/upload-foto';
import {Router} from '@angular/router';
import {Auth} from '../../models/auth';
import {UserPhoto} from '../../models/user-photo';
import { v4 as uuidv4 } from 'uuid';
import {RecetasService} from '../../services/recetas/recetas.service';

@Component({
  selector: 'app-recetas',
  templateUrl: './recetas.component.html',
  styleUrls: ['./recetas.component.css']
})
export class RecetasComponent implements OnInit {

  constructor(
    private imageCompress: NgxImageCompressService,
    private router: Router,
    private recetasService: RecetasService) {
  }


  public imageSrc = '';
  private Base64imageSrc = '';
  isImageSaved: boolean;
  fileObject: any = [];

  imgResultBeforeCompress: string;
  imgResultAfterCompress: string;

  userLocalStorage: Auth = {
    nombre_completo: '',
    usuario: '',
    contrasenia: ''
  };

  uploadData: UploadFoto = {
    id: '',
    user: '',
    base64: ''
  };

  getPhotosUser: UserPhoto = {
    usuario: ''
  };



  Photos: any = [];
  pathsPhotos = [];

  Recetas: any = [];


  ngOnInit() {
    if (localStorage.getItem('usuario') != null) {
      this.userLocalStorage = JSON.parse(localStorage.getItem('usuario'));

      this.Recetas = this.getPhotos();
      // console.log(this.Recetas);

    } else {
      console.log('ACCESO DENEGADO');
      this.router.navigate(['/login']);
    }
  }

  handleInputChange(e) {
    const file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    const pattern = /image-*/;
    const reader = new FileReader();
    this.fileObject = file;
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);

  }


  _handleReaderLoaded(e) {
    const reader = e.target;
    this.imageSrc = reader.result;
    this.imgResultBeforeCompress = this.imageSrc;

    this.imageCompress.compressFile(this.imageSrc, -1, 40, 40).then(
      result => {
        this.imgResultAfterCompress = result;
        this.imageSrc = this.imgResultAfterCompress;

      }
    );
    const splits = this.imageSrc.split(',');
    this.Base64imageSrc = splits[1];
    this.isImageSaved = true;
  }

  removeImage() {
    this.imageSrc = null;
    this.isImageSaved = false;
  }

  upload() {
    this.uploadData.id = uuidv4();
    this.uploadData.user = this.userLocalStorage.usuario;
    this.uploadData.base64 = this.Base64imageSrc;
    console.log(this.uploadData);

   this.recetasService.postReceta(this.uploadData).subscribe(
      res => {
        console.log(res);
        alert('Receta cargada');
        this.getPhotos();
        this.removeImage();

      }, err => console.log(err)
    );
  }

  getPhotos() {

    this.getPhotosUser.usuario = this.userLocalStorage.usuario;
    console.log(this.getPhotosUser);
    this.recetasService.getRecetas(this.getPhotosUser).subscribe(
      res => {
        this.Photos = res;
        // console.log(this.Photos);
        // this.pathsPhotos = [];
        // console.log(this.Photos);
        this.Photos.data.Items.forEach((element) => {
          if (element.photo != null) {
            this.pathsPhotos.push({photo: element.photo.S, id: element.id.S});
           // console.log(element.photo.S);

          }
        });

        console.log(this.pathsPhotos);
        this.Recetas = this.pathsPhotos;
        console.log(this.Recetas);
      }, err => console.log(err)
    );

    return this.pathsPhotos;
  }


}
