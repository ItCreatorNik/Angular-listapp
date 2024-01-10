import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, distinctUntilChanged } from 'rxjs';
import {
  IProduct,
  IProductTag,
  Product,
  ProductTag,
} from '../product/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly _products$: BehaviorSubject<IProduct[]> =
    new BehaviorSubject<IProduct[]>([
      new Product('Product 1', 'test', 100, [
        new ProductTag('meat', '#fa0000'),
      ]),
      new Product('Product 2', 'desc test', 100, [
        new ProductTag('onion', '#fad900'),
      ]),
    ]);
  private readonly _selectedTags$: BehaviorSubject<IProductTag[]> =
    new BehaviorSubject<IProductTag[]>([]);
  public readonly products$ = this._products$.asObservable();

  public readonly tags$: Observable<IProductTag[]> = this.products$.pipe(
    map((products) => {
      const uniqueValues = new Set<string>();
      const uniqueTags: IProductTag[] = [];

      products.forEach((product) => {
        product.tags.forEach((tag) => {
          if (!uniqueValues.has(tag.name)) {
            uniqueValues.add(tag.name);
            uniqueTags.push(tag);
          }
        });
      });

      return uniqueTags;
    })
  );
  private readonly _filteredProducts$: BehaviorSubject<IProduct[]> =
    new BehaviorSubject<IProduct[]>(this._products$.getValue());
  public readonly filteredProducts$ = this._filteredProducts$.asObservable();

  get filteredProducts(): IProduct[] {
    return this._filteredProducts$.getValue();
  }

  set filteredProducts(products: IProduct[]) {
    this._filteredProducts$.next(products);
  }

  get products(): IProduct[] {
    return this._products$.getValue();
  }

  private set products(products: IProduct[]) {
    this._products$.next(products);
  }

  get selectedTags(): IProductTag[] {
    return this._selectedTags$.getValue();
  }

  private set selectedTags(tags: IProductTag[]) {
    this._selectedTags$.next(tags);
  }

  public addProduct(newProduct: IProduct): void {
    this.products = [...this.products, newProduct];
    this.filteredProducts = this.products;
  }

  public addTags(newTags: IProductTag[]): void {
    if (!newTags[0]) {
      this.selectedTags = [];
      this.filteredProducts = this.products;
      return;
    }
    this.selectedTags = [...newTags];
    this.filterProductsByTagId(this.selectedTags);
  }

  public clearTags(): void {
    this.selectedTags = [];
    this.filteredProducts = this.products;
  }

  public filterProductsByTagId(tags: IProductTag[]): void {
    this.filteredProducts = this.products.filter((product) =>
      product.tags.some((productTag) =>
        tags.map((tag) => tag.name).includes(productTag.name)
      )
    );
  }

  public updateProduct(editedProduct: IProduct): void {
    const updateProducts = this.products.map((product) =>
      product.id === editedProduct.id ? editedProduct : product
    );
    this.products = updateProducts;
    this.filteredProducts = updateProducts;
  }

  public getProductById(id: string | null): IProduct | undefined {
    const product = this.products.find((product) => product.id === id);
    return structuredClone(product);
  }

  public removeProductById(id: string): void {
    this.products = this.products.filter((product) => product.id !== id);
    this.filteredProducts = this.products;
  }
}
