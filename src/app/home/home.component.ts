import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../services/product-service.service';
import { product } from '../data-type';
import {faShoppingCart,faEye,faArrowTrendUp } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private service:ProductServiceService){}

  popularProducts:undefined|product[];
  trendyproduct:undefined|product[];
  cartIcon=faShoppingCart
  viewIcon=faEye
  trendIcon=faArrowTrendUp

  ngOnInit(): void {
    this.service.popularProduct().subscribe((data)=>{
      console.warn(data)
      this.popularProducts=data //next step is plot it in html
    });
    this.service.trendyProducts().subscribe((res)=>{
      this.trendyproduct=res;
    });
  }
}
