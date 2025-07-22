import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AdditionalProductsComponent } from '../../components/additional-products/additional-products.component';
import { AdditionalProductsService } from '../../services/additional-products/additional-products';
import { AdditionalProducts } from '../../models/additional-products';

@Component({
  selector: 'app-sauce',
  standalone: true,
  imports: [CommonModule, AdditionalProductsComponent],
  templateUrl: './additional-products.component.html',
  styleUrls: ['./additional-products.component.scss'],
})
export class AdditionalProductsPage {
  additionalProductsList: AdditionalProducts[];
  constructor(private additionalProductsService: AdditionalProductsService) {
    this.additionalProductsList =
      this.additionalProductsService.getAdditionalProducts();
  }
}
