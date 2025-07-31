import { Component, Input, inject } from '@angular/core';
import { Produit } from '../../models/produit';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-card-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-product.component.html',
  styleUrl: './card-product.component.css'
})
export class CardProductComponent {
  @Input() product!: Produit;

  private cartService = inject(CartService);

  addToCart() {
    this.cartService.addItem(this.product);
    alert(`ya ca dans le panier maintenant"${this.product.title}" `);
  }
}
