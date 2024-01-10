import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IProduct, IProductTag, Product, ProductTag } from '../product.model';
import { ProductsService } from 'src/app/services/products.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {
  public newProduct: IProduct = new Product('', '', 0, []);
  public newTag: IProductTag = new ProductTag('', '');
  public tags$: Observable<IProductTag[]> = this.productsService.tags$;
  public isEdit: boolean = false;
  private readonly _isTagEdit$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(
      this.isEdit &&
        this.newProduct.tags.find((tag) => tag.id === this.newTag.id) !==
          undefined
    );

  get isTagEdit(): boolean {
    return this._isTagEdit$.getValue();
  }

  private set isTagEdit(value: boolean) {
    this._isTagEdit$.next(value);
  }

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private productsService: ProductsService
  ) {}

  public ngOnInit(): void {
    const id: string | null = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.newProduct = this.productsService.getProductById(id)!;
      this.isEdit = true;
    }
  }
  private setTagIsEdit(): void {
    this.isTagEdit =
      this.isEdit &&
      this.newProduct.tags.find((tag) => tag.id === this.newTag.id) !==
        undefined;
  }

  public handleTag(): void {
    this.setTagIsEdit();
    if (this.isTagEdit) {
      this.newProduct.tags = this.newProduct.tags.map((tag) =>
        tag.id === this.newTag.id ? this.newTag : tag
      );
      this.newTag = new ProductTag('', '');
      this.setTagIsEdit();
    } else if (!this.isTagEdit) {
      this.newProduct.tags.push(this.newTag);
      this.newTag = new ProductTag('', '');
    }
  }
  public editTag(id: string): void {
    const cloneTag = structuredClone(this.newProduct.tags.find((tag) => tag.id === id))
    this.newTag = cloneTag!;
    this.setTagIsEdit();
  }
  public removeTag(id: string): void {
    this.newProduct.tags = this.newProduct.tags.filter((tag) => tag.id !== id);
  }
  public handleProduct(): void {
    if (this.isEdit) {
      this.productsService.updateProduct(this.newProduct);
    } else {
      this.productsService.addProduct(this.newProduct);
    }
    this.newProduct = new Product('', '', 0, []);
    this.router.navigate(['/']);
  }
  public goBack(): void {
    this.router.navigate(['/']);
  }
}
