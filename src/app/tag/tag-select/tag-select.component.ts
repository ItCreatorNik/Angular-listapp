import { Component } from '@angular/core';
import {ProductsService} from "../../services/products.service";
import {Observable} from "rxjs";
import {IProductTag} from "../../product/product.model";

@Component({
  selector: 'app-tag-select',
  templateUrl: './tag-select.component.html',
  styleUrls: ['./tag-select.component.scss']
})
export class TagSelectComponent {
  public tags$: Observable<IProductTag[]> = this.productsService.tags$;
  public selectedTags: IProductTag[] = [];
  constructor(
    private productsService: ProductsService
  ) {}

  public onTagSelectionChange(): void {
    this.productsService.addTags(this.selectedTags);
  }
}
