import { Component } from '@angular/core';
import {Router} from "@angular/router";
import { ProductsService } from 'src/app/services/products.service';
import {BehaviorSubject, map, Observable} from "rxjs";
import {IProduct, IProductTag, Product} from "../product.model";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {

  public tags$: Observable<IProductTag[]> = this.productsService.tags$;
  public filteredProducts$: Observable<IProduct[]> = this.productsService.filteredProducts$;

  constructor(
    private router: Router,
    private productsService: ProductsService
  ) {}

  public navigateToCreate(): void {
    this.router.navigate(['product-create']);
  }
  public navigateToProduct(id: string): void {
    this.router.navigate(['product', id]);
  }
  public removeItem(id: string): void {
    this.productsService.removeProductById(id);
  }

  public clearTags(): void {
    this.productsService.clearTags();
  }
}
