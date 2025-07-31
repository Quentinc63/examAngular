import { Component,Input } from '@angular/core';
import { Produit } from '../../models/produit';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-product.component.html',
  styleUrl: './card-product.component.css'
})
export class CardProductComponent {

  @Input() product!: Produit;

}
