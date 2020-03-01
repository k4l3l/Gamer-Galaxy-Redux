import { Injectable } from '@angular/core';
import { DomProviderService } from './dom-provider.service';
import { IChildConfig } from 'src/app/shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ModalProviderService {
  private modalElementId = 'modal-container';
  private overlayElemId = 'overlay';

  constructor(private domService: DomProviderService) { }

  init(component: any, inputs: object, outputs: object) {
    const componentConfigs: IChildConfig = {
      inputs, outputs
    };

    this.domService.appendCompTo(this.modalElementId, component, componentConfigs);
    document.getElementById(this.modalElementId).className = 'show';
    document.getElementById(this.overlayElemId).className = 'show';
  }

  destroy() {
    this.domService.removeComponent();
    document.getElementById(this.modalElementId).className = 'hidden';
    document.getElementById(this.overlayElemId).className = 'hidden';
  }

}
