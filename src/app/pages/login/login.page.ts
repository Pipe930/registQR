import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { BaseDatosService } from './../../services/base-datos.service';
import { Router } from '@angular/router';
import { User } from './../../module/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public formularioLogin: FormGroup | any;
  public usuario!: User;
  public token: string = 'true';

  constructor(
    private builder: FormBuilder,
    private alerta: AlertController,
    private servicioBD: BaseDatosService,
    private ruta: Router
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

  ionViewWillEnter():void{
    this.servicioBD.obtenerDatos('user')?.subscribe(resultadoPeticion => {
      this.usuario = JSON.parse(resultadoPeticion);
    });
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

  public async alertaError(){
    const alert = await this.alerta.create({
      header: 'Error',
      subHeader: 'Mensaje de Error',
      message: 'Los datos no son validos',
      buttons: ['Ok'],
    });

    await alert.present();
  }

  public login():void{
    let formulario = this.formularioLogin.value;

    if(this.formularioLogin.invalid){
      this.formularioLogin.markAllAsTouched();
      alert("Faltan datos");
    } else {
      if(this.usuario.email == formulario.correo && this.usuario.password == formulario.contrasenia){
        this.alertaExito();
        this.formularioLogin.reset();
        sessionStorage.setItem('token', this.token);
        this.ruta.navigate(['home']);
      } else {
        this.alertaError();
      }
    }
  }

  get correo(){
    return this.formularioLogin.get('correo');
  }

  get contrasenia(){
    return this.formularioLogin.get('contrasenia');
  }
}
