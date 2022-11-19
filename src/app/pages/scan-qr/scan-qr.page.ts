import { Component, OnDestroy, OnInit } from '@angular/core';
import { BarcodeScanner, SupportedFormat } from '@capacitor-community/barcode-scanner';
import { Browser } from '@capacitor/browser';

@Component({
  selector: 'app-scan-qr',
  templateUrl: './scan-qr.page.html',
  styleUrls: ['./scan-qr.page.scss'],
})
export class ScanQRPage implements OnInit, OnDestroy {

  public scannerResultado: any;
  public errorQR: any;
  public content_visibility = 'hidden';

  constructor() { }

  ngOnInit() {
    this.content_visibility = 'show';
  }

  public checkPermission(){
    let permiso;
    const checkPermission = async () => {
      // check or request permission
      const status = await BarcodeScanner.checkPermission({ force: true });

      if (status.granted) {
        // the user granted permission
        return true;
      }

      return false;
    };

    checkPermission();

    permiso = checkPermission();


    return permiso;
  }

  public async startScan(){
    try{

      const permission = await this.checkPermission();
      if(!permission){
        return;
      }

      await BarcodeScanner.hideBackground();

      document.querySelector('body')?.classList.add('scanner-active');

      this.content_visibility = 'hidden';

      const result = await BarcodeScanner.startScan({
        targetedFormats: [SupportedFormat.QR_CODE]
      });

      console.log(result);

      BarcodeScanner.showBackground();
      document.querySelector('body')?.classList.remove('scanner-active');

      this.content_visibility = '';

      if(result?.hasContent){
        this.scannerResultado = result.content;
        console.log(result.content);
      }

    }catch(error){
      console.log(error);
      this.stopScan();
    }
  }

  public async resultado(){
    await Browser.open({ url: this.scannerResultado });
  }

  public stopScan(){
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
    document.querySelector('body')?.classList.remove('scanner-active');
    this.content_visibility = '';
  }

  ngOnDestroy():void{
    this.stopScan();
  }

}
