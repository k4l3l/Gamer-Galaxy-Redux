import { Component, OnInit, OnDestroy } from '@angular/core';
import { IAppState, getProduct } from 'src/app/+store';
import { Store } from '@ngrx/store';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { CreateProduct, LoadProduct, ClearProduct } from 'src/app/+store/product/actions';
import { Product } from 'src/app/shared/interfaces';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit, OnDestroy {
  prodForm: FormGroup;
  genres: FormArray;
  constructor(
    private store: Store<IAppState>,
    private fb: FormBuilder,
    private route: ActivatedRoute
    ) {  }
  product$: Observable<Product>;

  ngOnInit() {
    // Temporal fix for the two forms
    const _isEdit: boolean = this.route.snapshot.url[1].toString() === 'edit';
    if (_isEdit) {
      this.store.dispatch(new LoadProduct());
      this.product$ = this.store.select(getProduct);
    }

    this.prodForm = this.fb.group({
      title: ['', [ Validators.required, Validators.minLength(3) ]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.min(1)]],
      image: ['', [Validators.required]],
      genres: _isEdit ? this.fb.array([], Validators.required)
      : this.fb.array([this.createGenre()], Validators.required),
    });

  }

  createGenre() {
    return this.fb.group({
      genre: ['', [Validators.required]]
    });
  }

  addGenre() {
    this.genres = this.prodForm.get('genres') as FormArray;
    this.genres.push(this.createGenre());
  }

  removeGenre() {
    if (this.genres.length > 1) {
      this.genres.removeAt(this.genres.length - 1);
    }
  }

  create() {
    this.prodForm.value.genres = this.prodForm.value.genres.map(obj => obj.genre);
    this.store.dispatch(new CreateProduct(this.prodForm.value));
  }

  edit() {

  }

  ngOnDestroy() {
    if (this.route.snapshot.url[1].toString() === 'edit') {
      this.store.dispatch(new ClearProduct());
    }
  }

}
