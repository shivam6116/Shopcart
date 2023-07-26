import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Login, SignUp } from '../data-type';
import { BehaviorSubject } from 'rxjs';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  isUserLoggIn = new BehaviorSubject<boolean>(false);
  isLoginError= new EventEmitter<boolean>(false)

  constructor(private http: HttpClient, private router: Router) { }
  userSignUp(data: SignUp) {
    this.http.post("http://localhost:3000/seller", data,
      { observe: 'response' }).subscribe((result) => {
        this.isUserLoggIn.next(true);
        localStorage.setItem('seller', JSON.stringify(result.body)); // storing the dataaa 
        this.router.navigate(['SellerHomePage']);
      }); // Api calling

  }

  reloadSeller(){
    if(localStorage.getItem('seller')){
      this.isUserLoggIn.next(true);
      this.router.navigate(['SellerHomePage']);
    }
  }

  userLoggin(data:Login){
    console.warn(data);
    this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`,
      { observe: 'response' }).subscribe((result:any) => {
        console.warn(result)
        if(result && result.body &&result.body.length){
          console.warn("Seller logged in")
          localStorage.setItem('seller', JSON.stringify(result.body)); // storing the dataaa 
          this.router.navigate(['SellerHomePage']);
        }
        else{
          console.warn("Login Failed")
          this.isLoginError.emit(true);
        }

        // this.isUserLoggIn.next(true);
        
      }); // Api calling
  }
}
