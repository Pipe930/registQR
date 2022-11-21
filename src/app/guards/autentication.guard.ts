import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AutenticationGuard implements CanActivate {

  constructor(
    private ruta: Router
  ){ }

  canActivate(){
    if(sessionStorage.getItem('token')){
      return true;
    } else {
      this.ruta.navigate(['login']);
      return false;
    }
  }

}
