import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { Product } from '../Model/Product'; // Asegúrate de que la ruta a tu modelo Product sea correcta

// 1. Define la interfaz del estado del carrito
export interface CartState {
  items: Product[];     // Array de productos en el carrito
  totalPrice: number;   // Precio total del carrito
}

// 2. Define el estado inicial del carrito
const initialCartState: CartState = {
  items: [],        // Inicialmente el carrito está vacío
  totalPrice: 0     // El precio total inicial es 0
};

// 3. Crea el Store del carrito
@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'cart' }) // Nombre único para este store
export class CartStore extends Store<CartState> {
  constructor() {
    super(initialCartState); // Inicializa el Store con el estado definido
  }
}