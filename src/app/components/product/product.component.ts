import { Component, Input, EventEmitter, Output } from '@angular/core';
import { IAppState, getAuthIsAdmin } from 'src/app/+store';
import { Store } from '@ngrx/store';
import { ModalProviderService } from 'src/app/core/services/modal-provider.service';
import { DeleteProductDialogComponent } from '../delete-product-dialog/delete-product-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {

  @Input() data;
  isClicked: boolean = false;

  constructor(private store: Store<IAppState>,
    private modalProvider: ModalProviderService,
    private router: Router) { }

  isAdmin$ = this.store.select(getAuthIsAdmin);

  initLoginModal() {
    const inputs = {
      product: this.data
    };

    this.modalProvider.init(DeleteProductDialogComponent, inputs, {});
  }

  details() {
    this.router.navigate([`product/${this.data._id}`]);
    this.isClicked = true;
  }

}
