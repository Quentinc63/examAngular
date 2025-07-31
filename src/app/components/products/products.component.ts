import { Component, inject } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Produit } from '../../models/produit';
import { CommonModule } from '@angular/common';
import { CardProductComponent } from '../card-product/card-product.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, CardProductComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

  private productService: ProductService = inject(ProductService);
  productArray: Array<Produit> = []
  

  loadProducts () {
      this.productService.getAll().subscribe(products => {
      console.log(products);
      this.productArray = products;
    });
  }
  ngOnInit() {
    this.loadProducts();

  }
  

}
