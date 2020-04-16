import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Router } from '@angular/router';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private usuariosService: UsuarioService, private router: Router) { }

  userLocalStorage : any = {};
  usuario: Usuario = {
    id_usuario: 0,
    nombre_completo: '',
    usuario: '',
    contrasenia: ''
  };

  ngOnInit(): void {
    if (localStorage.getItem("usuario") != null) {
      this.userLocalStorage = JSON.parse(localStorage.getItem("usuario"));
    } else {
      console.log("ACCESO DENEGADO");
      this.router.navigate(['/error']);
    }
    this.usuariosService.getUsuario(this.userLocalStorage.id_usuario).subscribe(
      res => {
        console.log(res);
        this.usuario = res[0];
        console.log(this.usuario);
      },
      err => console.log(err)
    );
  }

}
