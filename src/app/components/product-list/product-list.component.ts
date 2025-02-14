import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { ProductListModel } from '../../models/products/product-list-model';
import { ProductComponent } from "./product/product.component";

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  products: ProductListModel[] = [];

  constructor(private readonly productService: ProductService) {

  }
  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(res => {
      this.products = res;
    })
  }
}
