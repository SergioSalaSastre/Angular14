import { Injectable } from '@angular/core';
import { Product } from '../Model/Product'; // Asegúrate de que la ruta a tu modelo Product sea correcta
import {  Observable } from 'rxjs'; // Importamos BehaviorSubject y Observable
import { CartStore } from '../cart-state/cart.store';

@Injectable({
  providedIn: 'root' // Esto hace que el servicio sea un 'singleton' y esté disponible en toda la aplicación
})
export class CartService {
  
  constructor(private cartStore: CartStore) { }

   // Método para añadir un producto al carrito
  addToCart(product: Product): void {
    // Usamos el método update() del Akita Store para modificar el estado
    // El 'state' que recibes es el estado actual del carrito
    this.cartStore.update(state => {
      // Crea un nuevo array con el producto añadido (¡importante la inmutabilidad con [...])
      const updatedItems = [...state.items, product];
      // Recalcula el precio total basándose en el nuevo array de ítems
      const updatedTotalPrice = updatedItems.reduce((sum, item) => sum + item.price, 0);

      // Devuelve el nuevo estado que Akita usará para actualizar el Store
      return {
        items: updatedItems,
        totalPrice: updatedTotalPrice
      };
    });
    console.log('Producto agregado al carrito:', product.name);
  }

  // Método para eliminar un producto del carrito por índice (o por ID, sería mejor en un futuro)
  removeFromCart(index: number): void {
    this.cartStore.update(state => {
      // Filtra para crear un nuevo array SIN el ítem en el índice especificado
      const updatedItems = state.items.filter((_, i) => i !== index);
      // Recalcula el precio total
      const updatedTotalPrice = updatedItems.reduce((sum, item) => sum + item.price, 0);

      return {
        items: updatedItems,
        totalPrice: updatedTotalPrice
      };
    });
    console.log('Producto eliminado del carrito (índice:', index, ')');
  }

  // Método para vaciar el carrito
  clearCart(): void {
    // Simplemente actualiza el Store a un estado vacío
    this.cartStore.update({
      items: [],        // Deja el array de ítems vacío
      totalPrice: 0     // Establece el total a 0
    });
    console.log('Carrito vaciado');
  }

  // ¡IMPORTANTE! Si tenías métodos como getCart() o getCartItemCount() aquí, ELIMÍNALOS.
  // Ahora, los componentes que necesiten obtener los datos del carrito usarán directamente el CartQuery.
}