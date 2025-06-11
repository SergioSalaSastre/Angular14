import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { CartStore, CartState } from './cart.store';
import { Product } from '../Model/Product'; // Asegúrate de la ruta a tu modelo Product
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CartQuery extends Query<CartState> {
  constructor(protected override store: CartStore) {
    super(store);
  }

  // Selector para obtener todos los productos del carrito como un Observable
  selectAllItems(): Observable<Product[]> {
    return this.select(state => state.items);
  }

  // Selector para obtener el número total de ítems en el carrito como un Observable
  selectItemsCount(): Observable<number> {
    return this.select(state => state.items.length);
  }

  // Selector para obtener el precio total del carrito como un Observable
  selectTotalPrice(): Observable<number> {
    return this.select(state => state.totalPrice);
  }
}