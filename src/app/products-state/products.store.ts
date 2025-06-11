import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { Product } from '../Model/Product'; // Ajusta esta ruta si tu Product.ts está en otro lugar

// 1. Define la interfaz del estado de los productos
export interface ProductsState {
  products: Product[]; // Array de productos disponibles en la tienda
  areProductsLoaded: boolean; // Para saber si ya se cargaron los productos
}

// 2. Define el estado inicial de los productos (tus datos mock)
// Asegúrate de que CADA PRODUCTO TIENE UN 'id' ÚNICO
const initialProductsState: ProductsState = {
  products: [
    {
      id: 'prod-001', // ¡Importante: añade un ID único a cada producto!
      name: 'Camiseta de algodón',
      description: 'Cómoda camiseta de algodón de alta calidad.',
      price: 19.99,
      imageUrl: 'https://hussars.net/cdn/shop/files/CAMISETA_BLANCA.jpg?v=1747208819&width=1946',
    },
    {
      id: 'prod-002',
      name: 'Camisa blanca',
      description: 'Camisa blanca',
      price: 29.99,
      imageUrl: 'https://consolvilar.com/wp-content/uploads/2024/04/camisa-blanca-4-scaled.jpg',
    },
    {
      id: 'prod-003',
      name: 'Vestido verano',
      description: 'Cómodo vestido de verano',
      price: 19.99,
      imageUrl: 'https://media.vogue.es/photos/649952a90c1ad08cd05c97f5/1:1/w_424,h_424,c_limit/lily-rose-depp_0%20copia.jpg',
    },
    {
      id: 'prod-004',
      name: 'Conjunto informal',
      description: 'Conjunto informal verano',
      price: 39.99,
      imageUrl: 'https://sopotey.com/blog/wp-content/uploads/2022/05/ropa-diferente-y-original-mujer.jpg',
    },
    {
      id: 'prod-005',
      name: 'Pantalón vaquero',
      description: 'Pantalón vaquero de corte moderno y cómodo.',
      price: 29.99,
      imageUrl: 'https://cdn.grupoelcorteingles.es/SGFM/dctm/MEDIA03/202501/29/00114911100064____14__967x1200.jpg',
    },
    {
      id: 'prod-006',
      name: 'Lencería',
      description: 'Lencería verano',
      price: 49.99,
      imageUrl: 'https://i.pinimg.com/474x/d5/30/c1/d530c1dc60ac3550de3e3ffb5014eb79.jpg',
    },
  ],
  areProductsLoaded: true, // Los marcamos como cargados porque son datos iniciales
};

// 3. Crea el Store
@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'products' }) // Nombre único para este store
export class ProductsStore extends Store<ProductsState> {
  constructor() {
    super(initialProductsState);
  }
}