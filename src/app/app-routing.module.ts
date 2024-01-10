import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductListComponent} from "./product/product-list/product-list.component";
import {ProductDetailComponent} from "./product/product-detail/product-detail.component";
import {ProductFormComponent} from "./product/product-form/product-form.component";

const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'product-create', component: ProductFormComponent },
  { path: 'product-edit/:id', component: ProductFormComponent },
  { path: 'product/:id', component: ProductDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
