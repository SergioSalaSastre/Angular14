import { Component, OnInit } from '@angular/core'; // Ya no necesitamos OnDestroy si solo usamos async pipe
import { Product } from '../Model/Product'; // Asegúrate de que la ruta a tu modelo Product sea correcta
import { Observable } from 'rxjs'; // Solo necesitamos Observable, ya no Subscription aquí

// Importa el CartService para las acciones (añadir, eliminar, vaciar)


// Importa el CartQuery para LEER los datos del carrito
import { CartQuery } from '../cart-state/cart.query'; // RUTA CORRECTA: '../cart-state/cart.query'
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
})
export class CarritoComponent implements OnInit {
  // Observables para obtener los datos del carrito de forma reactiva desde el CartQuery
  cartItems$!: Observable<Product[]>;  // Los ítems del carrito
  totalPrice$!: Observable<number>;    // El precio total
  itemCount$!: Observable<number>;     // El número de ítems

  constructor(
    private cartService: CartService, // Inyecta CartService para realizar acciones (eliminar, vaciar)
    private cartQuery: CartQuery      // Inyecta CartQuery para leer el estado del carrito
  ) {}

  ngOnInit(): void {
    // Asignamos los Observables a las propiedades del componente.
    // El HTML se "suscribirá" a ellos usando el async pipe para mostrar los datos.
    this.cartItems$ = this.cartQuery.selectAllItems();
    this.totalPrice$ = this.cartQuery.selectTotalPrice();
    this.itemCount$ = this.cartQuery.selectItemsCount();
  }

  // Método para eliminar un producto del carrito
  // Llama al método removeFromCart del CartService, que a su vez actualizará el CartStore.
  // Como cartItems$ está conectado al Store via CartQuery, la vista se actualizará automáticamente.
  removeFromCart(index: number): void {
    this.cartService.removeFromCart(index);
  }

  // Método para vaciar todo el carrito
  // Llama al método clearCart del CartService, que a su vez actualizará el CartStore.
  // La vista se actualizará automáticamente.
  clearCart(): void {
    this.cartService.clearCart();
  }

  // Ya no necesitamos la lógica de cálculo de total o de conteo de ítems aquí,
  // porque el CartQuery nos los proporciona directamente como Observables.
}