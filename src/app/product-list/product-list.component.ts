import { Component, OnInit } from '@angular/core';
import { Product } from '../Model/Product'; // Asegúrate de la ruta correcta a tu modelo
import { CartService } from '../services/cart.service';
import { ProductsQuery } from '../products-state/products.query'; // ¡Importa desde la nueva carpeta!
import { ProductsService } from '../products-state/products.service'; // ¡Importa desde la nueva carpeta!
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  // Esta es la lista de productos que están a la venta
  // ¡NO es el carrito!
  products$!: Observable<Product[]>;//usamos observable para productos

  constructor(private cartService: CartService,
              private productsQuery: ProductsQuery,
              private productsService: ProductsService) {} // Inyecta el CartService

  ngOnInit(): void {
    this.productsService.loadProducts(); //carga (simulada) los productos al iniciar
    this.products$ = this.productsQuery.selectAllProducts();//asigna el observable
  }

  // Método para agregar productos al carrito usando el CartService
  agregarAlCarrito(producto: Product): void {
    this.cartService.addToCart(producto); // Llama al método del servicio
  }
}
