import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnviromentService {


  API_URI = `https://q37jramjsh.execute-api.us-east-1.amazonaws.com/dev`;
  constructor() { }
}
