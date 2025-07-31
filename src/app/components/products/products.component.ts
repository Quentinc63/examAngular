import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Produit } from '../../models/produit';
import { CommonModule } from '@angular/common';
import { CardProductComponent } from '../card-product/card-product.component';
import { ProductFilterComponent } from '../product-filter/product-filter.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, CardProductComponent, ProductFilterComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  private productService: ProductService = inject(ProductService);
  loading: boolean = true;
  productArray: Array<Produit> = [];
  filteredProducts: Array<Produit> = [];

  loadProducts() {
    this.loading = true;
    this.productService.getAll().subscribe({
      next: products => {
        this.productArray = products;
        this.filteredProducts = products;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  ngOnInit() {
    this.loadProducts();
  }

  onFilterChange(filter: { category: string; text: string }) {
    console.log('Filtre reçu:', filter);
    this.filteredProducts = this.productArray.filter(product => {
      const matchesCategory = filter.category
        ? product.category.toLowerCase() === filter.category.toLowerCase()
        : true;

      const matchesText = filter.text
        ? product.title.toLowerCase().includes(filter.text.toLowerCase()) ||
        product.description.toLowerCase().includes(filter.text.toLowerCase())
        : true;

      return matchesCategory && matchesText;
    });
  }

}

