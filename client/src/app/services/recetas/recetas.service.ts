import { Injectable } from '@angular/core';
import {EnviromentService} from '../enviroment/enviroment.service';
import {HttpClient} from '@angular/common/http';
import {UploadFoto} from '../../models/upload-foto';
import {UserPhoto} from '../../models/user-photo';
import {UserId} from "../../models/user-id";

@Injectable({
  providedIn: 'root'
})
export class RecetasService {

  constructor(
    private env: EnviromentService,
    private http: HttpClient
  ) { }

  postReceta(photo: UploadFoto) {
    return this.http.post(`${this.env.API_URI}/uploadphoto`, photo);
  }

  getRecetas(user: UserPhoto) {
    return this.http.post(`${this.env.API_URI}/getrecetas`, user);
  }

  getReceta(id: UserId) {
    return this.http.post(`${this.env.API_URI}/getreceta`, id);
  }
}
