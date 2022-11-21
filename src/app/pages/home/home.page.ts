import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    private ruta: Router,
    private alerta: AlertController
  ) { }

  ngOnInit():void {
  }

  public async cerrarSesionAlerta(){
    const alert = await this.alerta.create({
      header: 'Sesion Terminada',
      message: 'Se finalizo la sesion',
      buttons: ['Aceptar'],
    });

    await alert.present();
  }

  public cerrarSesion(){
    this.cerrarSesionAlerta();
    sessionStorage.removeItem('token');
    this.ruta.navigate(['login']);
  }

}
