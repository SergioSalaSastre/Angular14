import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Importa tu NUEVO ProductListComponent
import { ProductListComponent } from './product-list/product-list.component';
import { DetailProductComponent } from './product-list/detail-product/detail-product.component';
import { CarritoComponent } from './carrito/carrito.component';

const routes: Routes = [
  // Página principal
  { path: 'productos', component: ProductListComponent },

  // Detalle producto
  { path: 'producto/:name', component: DetailProductComponent },

  //Carrito
  { path: 'carrito', component: CarritoComponent },

  { path: '', redirectTo: '/productos', pathMatch: 'full' },
  { path: '**', redirectTo: '/productos' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
