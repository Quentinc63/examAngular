import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Produit } from '../models/produit';

const CART_KEY = 'quentinclim_cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: Produit[] = [];
  private itemsSubject = new BehaviorSubject<Produit[]>([]);

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    const data = localStorage.getItem(CART_KEY);
    this.items = data ? JSON.parse(data) : [];
    this.itemsSubject.next(this.items);
  }

  private saveToStorage() {
    localStorage.setItem(CART_KEY, JSON.stringify(this.items));
  }

  getItems() {
    return this.itemsSubject.asObservable();
  }

  addItem(product: Produit) {
    this.items.push(product);
    this.saveToStorage();
    this.itemsSubject.next(this.items);
  }

  removeItem(productId: number) {
    this.items = this.items.filter(item => item.id !== productId);
    this.saveToStorage();
    this.itemsSubject.next(this.items);
  }

  clearCart() {
    this.items = [];
    this.saveToStorage();
    this.itemsSubject.next(this.items);
  }

  getTotal() {
    return this.items.reduce((sum, item) => sum + item.fullPrice * (1 - (item.discountPercent || 0)), 0);
  }
}
