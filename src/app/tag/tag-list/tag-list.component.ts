import { Component, Input } from '@angular/core';
import { IProductTag } from 'src/app/product/product.model';

@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.scss']
})
export class TagListComponent {
  @Input() tags: IProductTag[] = [];
}
