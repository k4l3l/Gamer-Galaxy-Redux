import { Component, OnInit, OnDestroy } from '@angular/core';
import { IAppState } from 'src/app/+store';
import { Store } from '@ngrx/store';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { ProductCreated, ProductRequested, ProductEdited } from 'src/app/+store/product/actions';
import { Product } from 'src/app/shared/interfaces';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  prodForm: FormGroup;
  genres: FormArray;
  constructor(
    private store: Store<IAppState>,
    private fb: FormBuilder,
    private route: ActivatedRoute
    ) {  }
  product: Product;

  ngOnInit() {
    // Temporal fix for the two forms
    this.route.data.subscribe( ({ product }) => this.product = product);
    this.prodForm = this.fb.group({
      title: [ '', [ Validators.required, Validators.minLength(3) ]],
      description: [ '', [Validators.required]],
      price: [ '', [Validators.required, Validators.min(1)]],
      image: [ '', [Validators.required]],
      genres: this.fb.array([this.createGenre()], Validators.required),
    });
    this.genres = this.prodForm.get('genres') as FormArray;
    if (this.product) {
      this.prodForm.patchValue(this.product);
      this.genres.removeAt(0);
      this.product.genres.forEach(e => this.genres.push(this.fb.group({
        genre: [e , [Validators.required]]
      })));
    }

  }

  createGenre() {
    return this.fb.group({
      genre: ['', [Validators.required]]
    });
  }

  addGenre() {
    this.genres.push(this.createGenre());
  }

  removeGenre() {
    if (this.genres.length > 1) {
      this.genres.removeAt(this.genres.length - 1);
    }
  }

  create() {
    this.prodForm.value.genres = this.prodForm.value.genres.map(obj => obj.genre);
    this.store.dispatch(new ProductCreated(this.prodForm.value));
  }

  edit() {
    this.prodForm.value.genres = this.prodForm.value.genres.map(obj => obj.genre);
    this.store.dispatch(new ProductEdited({ product: { ...this.prodForm.value, _id: this.product._id } }));
  }

}
