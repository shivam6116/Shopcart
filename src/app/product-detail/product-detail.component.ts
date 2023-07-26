import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ProductServiceService } from '../services/product-service.service';
import { cart, product } from '../data-type';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  constructor(private activeroute:ActivatedRoute, private service:ProductServiceService){}

  productData:undefined|product;
  quantity:number=1;
  removeCart=false;

  ngOnInit(): void {
    let productId=this.activeroute.snapshot.paramMap.get("productid")
    productId && this.service.getProduct(productId).subscribe((result)=>{
      console.warn(result);
      this.productData=result;
    });

    let cartData=localStorage.getItem('localCart');
    if(productId && cartData){
      let item= JSON.parse(cartData);

      item=item.filter((item:product)=>productId==item.id.toString());
      if(item.length){
        this.removeCart=true
      }else{
        this.removeCart=false
      }
    }
  }

  handleQuantity(val:string){
    if(val=='max'){
      this.quantity +=1;
    }
    else if(this.quantity>1 && val==='min'){
      this.quantity -=1;
    }
  }
  addCart(){
    if(this.productData){
      this.productData.quantity=this.quantity;
      if(!localStorage.getItem('user')){
        console.warn(this.productData);
        this.service.localAddCart(this.productData)
        this.removeCart=true
      }else{
        console.warn("User is Logged In")
        let user=localStorage.getItem('user');
        let userId=user && JSON.parse(user).id;
        
        let cartData:any={
          ...this.productData,
          userId,
          productId:this.productData.id,
        }
        delete cartData.id;
        console.warn(cartData)
        this.service.addToCart(cartData).subscribe((result)=>{
          if(result){
            alert('Product is added')
          }
          // console.warn(result);
        })
      }

      
    }
  }
  removeToCart(productId:number){
    this.service.removeItemFromCart(productId);
    this.removeCart=false
  }
}
