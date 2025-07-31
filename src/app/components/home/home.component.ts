import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Produit } from '../../models/produit';
import { CardProductComponent } from '../card-product/card-product.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardProductComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  private productService = inject(ProductService);
  loading = true;
  productArray: Produit[] = [];
  topDiscountProducts: Produit[] = [];

  ngOnInit() {
    this.productService.getAll().subscribe(products => {
      this.productArray = products;

      this.topDiscountProducts = this.productArray
        .sort((a, b) => b.discountPercent - a.discountPercent)
        .slice(0, 3);
      this.loading = false;
    });
  }
}
