import { Component, Input } from '@angular/core';
import { ProductListModel } from '../../../models/products/product-list-model';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  @Input('product') product: ProductListModel | undefined;

  
}
