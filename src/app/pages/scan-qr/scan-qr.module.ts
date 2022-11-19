import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScanQRPageRoutingModule } from './scan-qr-routing.module';

import { ScanQRPage } from './scan-qr.page';
import { BaseDatosService } from './../../services/base-datos.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScanQRPageRoutingModule
  ],
  declarations: [ScanQRPage],
  providers: [BaseDatosService]
})
export class ScanQRPageModule {}
