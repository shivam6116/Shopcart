import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../services/product-service.service';
import { product } from '../data-type';
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit {
  constructor(private product:ProductServiceService){}
  productlist:undefined|product[];
  productMsg:undefined|string;
  icon=faTrash;
  edit=faEdit;

  ngOnInit(): void {
this.productList();
  }

  deleteProduct(id:number){
    this.product.removeProduct(id).subscribe((result)=>{
      if(result){
        this.productMsg="Deleted";
        this.productList();
      }
    });
    setTimeout(() => {
      this.productMsg=undefined
    });
  }

  productList(){
    this.product.productList().subscribe((result)=>{
      console.warn(result)
      this.productlist=result;});
  }


}
