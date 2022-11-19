import { Component, OnInit } from '@angular/core';
import { User } from './../../module/user';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { BaseDatosService } from './../../services/base-datos.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public formularioRegistro!: FormGroup;
  public usuario!: User;

  constructor(
    private ruta: Router,
    private builder: FormBuilder,
    private alerta: AlertController,
    private servicioBD: BaseDatosService
  ) {
    this.contruirFormulario();
  }

  public contruirFormulario():void{
    this.formularioRegistro = this.builder.group({
      nombre: new FormControl("", [Validators.required, Validators.minLength(4), Validators.maxLength(20)]),
      apellido: new FormControl("", [Validators.required, Validators.minLength(4), Validators.maxLength(20)]),
      nombre_usuario: new FormControl("", [Validators.required, Validators.minLength(4), Validators.maxLength(20)]),
      correo: new FormControl("", [Validators.required, Validators.email]),
      contrasenia: new FormControl("", [Validators.required, Validators.minLength(8), Validators.maxLength(16)])
    })
  }

  public async alertaError(){
    const alert = await this.alerta.create({
      header: 'Error',
      subHeader: 'Mensaje Importante',
      message: 'Faltan datos',
      buttons: ['OK'],
    });

    await alert.present();
  }

  public async alertaExito(){
    const alert = await this.alerta.create({
      header: 'Exito',
      message: 'Se registro correctamente',
      buttons: ['Aceptar'],
    });

    await alert.present();
  }

  public registrarse():void{
    let user = {
      firstName: this.formularioRegistro.value.nombre,
      lastName: this.formularioRegistro.value.apellido,
      username: this.formularioRegistro.value.nombre_usuario,
      email: this.formularioRegistro.value.correo,
      password: this.formularioRegistro.value.contrasenia
    }

    this.usuario = user;

    if(this.formularioRegistro.invalid){
      this.formularioRegistro.markAllAsTouched();
      this.alertaError();
    } else {
      this.servicioBD.guardarDatos('user', JSON.stringify(this.usuario));
      this.alertaExito();
      this.ruta.navigate(['login']);
    }
  }

  ngOnInit() {
  }

}
