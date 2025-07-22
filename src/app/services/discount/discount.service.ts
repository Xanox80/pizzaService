import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DiscountService {
  private activeDiscount: 'none' | 'secondPizza50' | 'thirdPizza60' = 'none';
  private discount$ = new BehaviorSubject(this.activeDiscount);

  setDiscount(discount: 'none' | 'secondPizza50' | 'thirdPizza60') {
    this.activeDiscount = discount;
    this.discount$.next(this.activeDiscount);
  }

  getDiscount() {
    return this.activeDiscount;
  }

  onDiscountChange(): Observable<'none' | 'secondPizza50' | 'thirdPizza60'> {
    return this.discount$.asObservable();
  }
}
