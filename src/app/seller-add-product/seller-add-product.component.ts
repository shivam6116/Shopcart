import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../services/product-service.service';
import { product } from '../data-type';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent implements OnInit {
  constructor(private product:ProductServiceService){}

  productMsg:string|undefined;

  ngOnInit(): void {
    
  }
  addUserProduct(data:product){
    // console.warn(data);
    this.product.addProduct(data).subscribe((result)=>{
      if(result){
        this.productMsg="Product added";
      }
      setTimeout(() =>this.productMsg=undefined,3000);
    })
  }

}
