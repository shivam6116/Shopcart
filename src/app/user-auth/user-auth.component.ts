import { Component, OnInit } from '@angular/core';
import { Login, SignUp, cart, product } from '../data-type';
import { UserService } from '../services/user.service';
import { ProductServiceService } from '../services/product-service.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {
  constructor(private service :UserService,private productService:ProductServiceService){}
  showLogin:Boolean=true;
  authError:string="";

  ngOnInit(): void {
    this.service.userAuthReload();
  }

  signUp(data:SignUp){
    this.service.userSignUp(data)
    
  }
  userlogInPage(data:Login){
    this.service.userLogin(data);
    this.service.invalidUser.subscribe((result)=>{
      console.warn("apple",result)
      if(result){
          this.authError="Please Enter Valid user Details"
      }else{
        this.localCartToRemoveCart();
      }
    })

  }
  openSignUp(){
    this.showLogin=false;
  }
  openLogin(){
    this.showLogin=true;
  }

  localCartToRemoveCart(){
    let data = localStorage.getItem('localCart');
    let user = localStorage.getItem('user')
    let userId= user && JSON.parse(user).id;
    console.warn(userId);
    
      
    if(data){
      let cartDataList:product[]= JSON.parse(data);
      cartDataList.forEach((product:product,index)=>{
        let cartData:any={
          ...product,
          productId:product.id,
          userId
        }
        delete cartData.id;
        setTimeout(() => {
          this.productService.addToCart(cartData).subscribe((result)=>{
            console.warn("item stored in db")
          }
          )
          if(cartDataList.length===index+1){
            localStorage.removeItem('localCart');
          }
        }, 500);
      });
      
    }

    setTimeout(() => {
      this.productService.getCartList(userId);
    }, 2000);
  }

}
