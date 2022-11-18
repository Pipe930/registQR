import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { BaseDatosService } from './../../services/base-datos.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public formularioLogin!: FormGroup;

  constructor(
    private builder: FormBuilder,
    private alerta: AlertController,
    private servicioBD: BaseDatosService
  ) { }

  public construirFormulario():void{
    this.formularioLogin = this.builder.group({
      correo: new FormControl("", [Validators.required, Validators.email]),
      contrasenia: new FormControl("", [Validators.required, Validators.minLength(8), Validators.maxLength(16)])
    })
  }

  ngOnInit():void {
    this.construirFormulario();
  }

  public async alertaExito() {
    const alert = await this.alerta.create({
      header: 'Exito',
      subHeader: 'Mensaje de Exito',
      message: 'Se inicio la sesion correctamente',
      buttons: ['Aceptar'],
    });

    await alert.present();
  }

  public login(){
    if(this.formularioLogin.invalid){
      this.formularioLogin.markAllAsTouched();
      alert("Faltan datos");
    } else {
      this.alertaExito();
      this.servicioBD.guardarDatos('correo', this.formularioLogin.value.correo);
      this.servicioBD.guardarDatos('contrasenia', this.formularioLogin.value.contrasenia);
    }
  }
}
