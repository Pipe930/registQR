import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseDatosService {
  public dataBase: Storage | null = null;

  constructor(
    private data: Storage
  ) {
    if(this.dataBase == null){
      this.crearDataBase();
    }
   }

  public crearDataBase():void{
    from(this.data.create()).subscribe(resultado => {
      this.dataBase = resultado;
      console.log("Base de datos creada y conectada");
    });
  }

  public guardarDatos(key: string, value: any):void{
    if(!this.dataBase){
      console.log("La base de datos no se creo");
    } else {
      from(this.dataBase.set(key, value)).subscribe(resultado => {
        console.log("Se guardaron los datos con exito");
        console.log(resultado);
      });
    }
  }
}
