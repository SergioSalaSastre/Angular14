import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { ProductsStore, ProductsState } from './products.store';
import { Product } from '../Model/Product'; // Ajusta esta ruta si tu Product.ts está en otro lugar
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductsQuery extends Query<ProductsState> {
  constructor(protected override store: ProductsStore) {
    super(store);
  }

  // Selector para obtener todos los productos
  selectAllProducts(): Observable<Product[]> {
    return this.select(state => state.products);
  }

  // Selector para obtener un producto por nombre (para el DetailProductComponent, por ejemplo)
  selectProductByName(name: string): Observable<Product | undefined> {
    return this.select(state => state.products.find(p => p.name === name));
  }

  // Selector para saber si los productos ya están cargados
  areProductsLoaded(): Observable<boolean> {
    return this.select(state => state.areProductsLoaded);
  }
}