import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { DetailProductComponent } from './product-list/detail-product/detail-product.component';
import { CarritoComponent } from './carrito/carrito.component';
import { ProductListComponent } from './product-list/product-list.component';
import { Product } from './Model/Product';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DetailProductComponent,
    CarritoComponent,
    ProductListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
