import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ProductServiceService } from '../services/product-service.service';
import { product } from '../data-type';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchReasult:undefined|product[]
  constructor(private activateRoute:ActivatedRoute , private service:ProductServiceService){}
  ngOnInit(): void {
    let query = this.activateRoute.snapshot.paramMap.get('query');
    console.warn(query);
    query && this.service.searchProduct(query).subscribe((result)=>{
      this.searchReasult=result;

    })
  }

}
