import { EventEmitter, Injectable } from '@angular/core';
import { Login, SignUp } from '../data-type';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  invalidUser=new EventEmitter<boolean>;
  constructor(private http:HttpClient , private route:Router) { }
  userSignUp(data:SignUp){
    // console.warn(data);
    this.http.post('http://localhost:3000/Users',data,{observe:"response"}).subscribe((result)=>{
      console.warn(result)
      if(result){
        localStorage.setItem('user',JSON.stringify(result.body));
        this.route.navigate(['/Home'])
        
      }

    })

  }

  userLogin(data:Login){
    this.http.get<SignUp[]>(`http://localhost:3000/Users?email=${data.email}&${data.password}`,
    {observe:'response'}).subscribe((result)=>{
      if(result && result.body?.length){
        console.warn(result)
        this.invalidUser.emit(false)
        localStorage.setItem('user',JSON.stringify(result.body[0]));
        this.route.navigate(['/Home'])
      }else{
        this.invalidUser.emit(true)
      }
    })
  }


  userAuthReload(){
    if(localStorage.getItem('user')){
      this.route.navigate(['/Home']);
    }
  }
}
