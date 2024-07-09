import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentRoutingModule } from './payment-routing.module';
import { HdfcComponent } from './hdfc/hdfc.component';
import { RazorpayComponent } from './razorpay/razorpay.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HdfcComponent,
    RazorpayComponent,
  ],
  imports: [
    CommonModule,
    PaymentRoutingModule,
    ReactiveFormsModule,
  ]
})
export class PaymentModule { }
