import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../services/product-service.service';
import { product } from '../data-type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private service:ProductServiceService){}

  popularProducts:undefined|product[];
  trendyproduct:undefined|product[];

  ngOnInit(): void {
    this.service.popularProduct().subscribe((data)=>{
      console.warn(data)
      this.popularProducts=data //next step is plot it in html
    });
    this.service.trendyProducts().subscribe((res)=>{
      this.trendyproduct=res;
    });
  }
  // images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
}
