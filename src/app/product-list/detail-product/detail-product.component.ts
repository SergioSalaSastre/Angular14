import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../Model/Product';
import { CartService } from 'src/app/services/cart.service';
import { take } from 'rxjs/operators'; // Usaremos take(1) para obtener el valor una vez
import { Observable } from 'rxjs';
import { ProductsQuery } from 'src/app/products-state/products.query';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.css'],
})
export class DetailProductComponent implements OnInit {
  product$!: Observable<Product | undefined>;
  // Ya no necesitamos la lista de productos local 'private products: Product[] = [...]'
  // El producto se obtendrá del ProductsQuery

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService, // el CartService sigue para añadir al carrito
    private productsQuery: ProductsQuery //inyecto ProductsQuery
  ) {}

  ngOnInit(): void {
    // Escucha los cambios en los parámetros de la ruta
    this.route.paramMap.subscribe((params) => {
      const productName = params.get('name');
      if (productName) {
        // Usa ProductsQuery para seleccionar el producto por nombre
        // productsQuery.selectProductByName devuelve un Observable
        this.product$ = this.productsQuery.selectProductByName(productName);

        // Opcional: Si quieres obtener el valor una sola vez en ngOnInit y no como Observable,
        // podrías hacer esto (pero con un Observable es más reactivo):
        // this.productsQuery.selectProductByName(productName).pipe(take(1)).subscribe(product => {
        //   this.product = product;
        // });
      }
    });
  }

  // Método para agregar el producto actual al carrito usando el CartService
  // Necesitamos suscribirnos a product$ y tomar el valor una vez para pasarlo
  agregarAlCarrito(): void {
    // Ya no recibimos 'product' como argumento
    this.product$.pipe(take(1)).subscribe((product) => {
      if (product) {
        this.cartService.addToCart(product); // Llama al método del servicio
        console.log('Producto agregado desde detalle:', product.name);
      } else {
        console.warn(
          'No se pudo agregar el producto al carrito: producto no encontrado.'
        );
      }
    });
  }
}
