import { Component, Input } from '@angular/core';
import { ModalProviderService } from 'src/app/core/services/modal-provider.service';
import { IAppState } from 'src/app/+store';
import { Store } from '@ngrx/store';
import { ProductDeleted } from 'src/app/+store/product/actions';

@Component({
  selector: 'app-delete-product-dialog',
  templateUrl: './delete-product-dialog.component.html',
  styleUrls: ['./delete-product-dialog.component.css']
})
export class DeleteProductDialogComponent {

  @Input() inputs;

  constructor(
    private modalProvider: ModalProviderService,
    private store: Store<IAppState>
    ) { }

  close() {
    this.modalProvider.destroy();
  }

  remove() {
    const id = this.inputs.product._id;
    console.log(id);
    this.store.dispatch(new ProductDeleted({ id }));
    this.close();
  }

}
