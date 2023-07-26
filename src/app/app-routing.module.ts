import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SellerComponent } from './seller/seller.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { AuthGuard } from './auth.guard';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { SellerUpdateProductComponent } from './seller-update-product/seller-update-product.component';
import { SearchComponent } from './search/search.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { CartComponent } from './cart/cart.component';

const routes: Routes = [
  {
    path:'Home',
    component:HomeComponent
  },
  {
    path:'Seller',
    component:SellerComponent
  },
  {
    path:"SellerHomePage",
    component:SellerHomeComponent,
    canActivate:[AuthGuard]
  },
  {
    component:SellerAddProductComponent,
    path:"Seller-Add-Product",
    canActivate:[AuthGuard]
  },
  {
    component:SearchComponent,
    path:"search/:query"
  },
  {
    component:SellerUpdateProductComponent,
    path:"Seller-Update-Product/:id", //for populating data or prefilled
    canActivate:[AuthGuard]
  },
  {
    component:ProductDetailComponent,
    path:"Details/:productid"
  },
  {
    component:UserAuthComponent,
    path:"User Auth"
  },
  {
    component:CartComponent,
    path:"cart"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
