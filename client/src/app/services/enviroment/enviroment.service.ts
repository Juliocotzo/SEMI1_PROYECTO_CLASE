import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnviromentService {

  
  API_URI = `https://proyecto-seminario.herokuapp.com`;
  constructor() { }
}
