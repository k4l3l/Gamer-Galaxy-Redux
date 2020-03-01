import { Injectable, ComponentFactoryResolver, ApplicationRef, Injector, EmbeddedViewRef } from '@angular/core';
import { IChildConfig as childConfig } from '../../shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DomProviderService {

  private childComponentRef: any;

  constructor(
    private componentFactoryRes: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) { }

  public appendCompTo(parentId: string, child: any, childConfig?: childConfig) {
    // Create component reference from the child

    const childComponentRef = this.componentFactoryRes
    .resolveComponentFactory(child)
    .create(this.injector);

    // Attach config to the child (inputs and outputs)

    this.attachConfig(childConfig, childComponentRef);
    this.childComponentRef = childComponentRef;

    // Attach component to the appRef so that it's inside the ng component tree

    this.appRef.attachView(childComponentRef.hostView);

    // Get the DOM element from component
    const childDomElem = (childComponentRef.hostView as EmbeddedViewRef<any>)
    .rootNodes[0] as HTMLElement;

    // Append DOM element to body
    document.getElementById(parentId).appendChild(childDomElem);
  }

  public removeComponent() {
    this.appRef.detachView(this.childComponentRef.hostView);
    this.childComponentRef.destroy();
  }

  private attachConfig(config, componentRef) {
    const inputs = config.inputs;
    const outputs = config.outputs;

    componentRef.instance['inputs'] = inputs;
    componentRef.instance['outputs'] = outputs;
  }
}
