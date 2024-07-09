import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RazorpayComponent } from './razorpay/razorpay.component';
import { HdfcComponent } from './hdfc/hdfc.component';

const routes: Routes = [
  {
    path:'',redirectTo:'razorpay',pathMatch:'full'
  },
  
  {
    path:'razorpay',component:RazorpayComponent
  },
  {
    path:'hdfc',component:HdfcComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentRoutingModule { }
