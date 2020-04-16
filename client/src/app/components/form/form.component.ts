import { Component, OnInit } from '@angular/core';
import { Usuario } from './../../models/Usuario';
import { UsuarioService } from '../../services/usuario/usuario.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  constructor(
    private usuarioService: UsuarioService) { }

  ngOnInit(): void {
  }

  usuario: Usuario = {
    id_usuario: 0,
    nombre_completo: '',
    usuario: '',
    contrasenia: ''
  };

  registrarUsuario(password){
    delete this.usuario.id_usuario;
    if(this.usuario.contrasenia = password.value){
      this.usuarioService.registrar(this.usuario).subscribe(
        res => {
          if(res == null){
            
          }else {
            alert('Usuario Registrado Correctamente');
          }
        }, err => console.log(err)
      );
    }else{
      alert('Contrasenias no coinciden');
    }

  }

}
