import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Usuario } from '../../models/usuario';
import {EnviromentService} from '../enviroment/enviroment.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private http: HttpClient,
    private env: EnviromentService)  { }

  registrar(usuario: Usuario){
    return this.http.post(`${this.env.API_URI}/usuario`, usuario);
  }

  auth(usuario: Usuario){
    return this.http.post(`${this.env.API_URI}/auth`, usuario);
  }


}
