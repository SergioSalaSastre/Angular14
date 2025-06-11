import { Injectable } from '@angular/core';
import { ProductsStore } from './products.store';
import { Product } from '../Model/Product'; // Ajusta esta ruta si tu Product.ts está en otro lugar
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  constructor(private productsStore: ProductsStore) {}

  // Este método simula la carga de productos.
  // En una aplicación real, aquí harías una llamada a un backend para obtener los productos.
  loadProducts(): void {
    // Como estamos sin backend, los productos ya están en el estado inicial del store (en products.store.ts).
    // Solo necesitamos asegurarnos de que el flag 'areProductsLoaded' esté en true si alguna lógica dependiera de ello.
    // Si tuvieras una API, la llamada sería aquí:
    // this.productsStore.setLoading(true);
    // this.httpClient.get<Product[]>('/api/products').subscribe(
    //   products => this.productsStore.update({ products, areProductsLoaded: true }),
    //   error => this.productsStore.setError(error),
    //   () => this.productsStore.setLoading(false)
    // );
    this.productsStore.update({ areProductsLoaded: true });
  }

  // Puedes añadir otros métodos aquí si quisieras modificar la lista de productos disponibles,
  // por ejemplo, añadir un nuevo producto al catálogo.
  addProduct(product: Product): void {
    this.productsStore.update(state => ({
      products: [...state.products, product],
    }));
  }
}