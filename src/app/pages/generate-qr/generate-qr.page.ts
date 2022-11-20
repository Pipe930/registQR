import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-generate-qr',
  templateUrl: './generate-qr.page.html',
  styleUrls: ['./generate-qr.page.scss'],
})
export class GenerateQRPage implements OnInit {
  public textoQR: any;
  public crearQR: string = '';
  public creado: boolean = false;

  constructor() { }

  public generate():void {
    if(this.textoQR){
      this.crearQR = this.textoQR;
      this.creado = true;
    }
  }

  public limpiar():void{
    this.crearQR = '';
    this.creado = false;
  }

  ngOnInit():void {
  }

}
