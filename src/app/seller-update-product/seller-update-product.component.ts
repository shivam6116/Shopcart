import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductServiceService } from '../services/product-service.service';
import { product } from '../data-type';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent implements OnInit {
  constructor(private route:ActivatedRoute, private service:ProductServiceService){}

  productData:undefined|product;
  productMsg:undefined|string;



  ngOnInit(): void {
    let productid=this.route.snapshot.paramMap.get('id');
    console.warn(productid);
    productid && this.service.getProduct(productid).subscribe((data)=>{
        
        this.productData=data;
    });
  }

  submit(data:product){
    if(this.productData){
        data.id=this.productData.id;
    }
    console.warn(data);
    this.service.updateProduct(data).subscribe((result)=>{
      
      if(result){
        this.productMsg="this is updated"
      }

    });
    setTimeout(() => {
      this.productMsg=undefined;
    }, 3000);
  }

}
