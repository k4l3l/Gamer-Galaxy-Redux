import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() data: Product;
  
  constructor() { }

  ngOnInit() {
  }

}
