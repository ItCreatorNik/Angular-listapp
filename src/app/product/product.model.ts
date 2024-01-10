import { UUID } from "angular2-uuid";

export interface IProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  tags: IProductTag[];
}

export interface IProductTag {
  id: string;
  name: string;
  color: string;
}

export class Product implements IProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  tags: IProductTag[];

  constructor(name: string, description: string, price: number, tags: IProductTag[]) {
    this.id = UUID.UUID();
    this.name = name;
    this.description = description;
    this.price = price;
    this.tags = tags;
  }
}

export class ProductTag implements IProductTag {
  id: string;
  name: string;
  color: string;

  constructor(name: string, color: string) {
    this.id = UUID.UUID();
    this.name = name;
    this.color = color;
  }
}
