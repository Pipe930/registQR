import { Component, OnDestroy, OnInit } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

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

      const result = await BarcodeScanner.startScan();

      console.log(result);

      BarcodeScanner.showBackground();
      document.querySelector('body')?.classList.remove('scanner-active');

      this.content_visibility = 'show';

      if(result?.hasContent){
        BarcodeScanner.showBackground();
        document.querySelector('body')?.classList.remove('scanner-active');
        this.content_visibility = 'show';
        this.scannerResultado = result.content;
      }

    }catch(error){
      console.log(error);
      this.stopScan();
    }
  }

  public stopScan(){
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
    document.querySelector('body')?.classList.remove('scanner-active');
    this.content_visibility = 'show';
  }

  ngOnDestroy():void{
    this.stopScan();
  }

}
