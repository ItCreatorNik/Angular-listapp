import { Component, OnInit } from '@angular/core';
import { IProduct } from "../product.model";
import { ProductsService } from "../../services/products.service";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  public product?: IProduct;

  constructor(
    private productsService: ProductsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  public ngOnInit(): void {
    const id: string | null = this.activatedRoute.snapshot.paramMap.get('id');

    this.product = this.productsService.getProductById(id);
  }

  public goBack(): void {
    this.router.navigate(['/']);
  }

  public editProduct(id: string): void {
    this.router.navigate(['product-edit', id]);
  }
}
