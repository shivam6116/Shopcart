import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { SignUp } from '../data-type';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css']
})
export class SellerComponent implements OnInit {
  constructor(private seller:SellerService , private router:Router){}

  ngOnInit():void{
    this.seller.reloadSeller()
  }
  showLogin=false;
  authError:String='';

  signUp(data:SignUp):void{
      // Api calling
      this.seller.userSignUp(data)
      // subscribe() helps you to get data every where
      
      
  }
  logInPage(data:SignUp):void{
    this.authError="";
    this.seller.userLoggin(data)
    this.seller.isLoginError.subscribe((isError)=>{
      if(isError){
        this.authError="Invalid credintial";
      }
    });
  }
  openLogin(){
    this.showLogin=true;
  }
  openSignUp(){
    this.showLogin=false;
  }


}
