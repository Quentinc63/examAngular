import { Component, OnInit, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Produit } from '../../models/produit';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cartItems: Produit[] = [];
  private cartService = inject(CartService);

  ngOnInit() {
    this.cartService.getItems().subscribe(items => {
      this.cartItems = items;
    });
  }

  removeItem(productId: number) {
    this.cartService.removeItem(+productId);
    this.cartService.getItems().subscribe(items => {
      this.cartItems = items;
    });
  }

  getTotal(): number {
    return this.cartItems.reduce((sum, product) => {
      const price = product.discountPercent && product.discountPercent > 0
        ? product.fullPrice * (1 - product.discountPercent)
        : product.fullPrice;
      return sum + price;
    }, 0);
  }
}