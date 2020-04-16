import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { UsuarioService} from '../../services/usuario/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
  }

  usuario: Usuario = {
    id_usuario: 0,
    nombre_completo: '',
    usuario: '',
    contrasenia: ''
  };

  auth: any = [];

  logIn(usuario, password) {
    this.usuario.usuario = usuario.value;
    this.usuario.contrasenia = password.value;
    delete this.usuario.id_usuario;
    delete this.usuario.nombre_completo;

    this.usuarioService.auth(this.usuario).subscribe(
       res => {
         if(res == null)
          alert('El usuario no esta registrado')
        else{
          this.auth = res;
          if(this.auth.usuario == this.usuario.usuario){
            alert('Usuario Logueado');
            localStorage.setItem('usuario', JSON.stringify(this.auth));
            this.router.navigate(['/profile']);
          } else{
            alert('No se logro inciar sesión, revise los datos');
          }
        }

       } , err => console.log(err)
    );
  }
}
