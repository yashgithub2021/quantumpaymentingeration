import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PaymentService } from 'src/app/services/payment.service';

declare var Razorpay:any;

@Component({
  selector: 'app-razorpay',
  templateUrl: './razorpay.component.html',
  styleUrls: ['./razorpay.component.scss']
})
export class RazorpayComponent implements OnInit {
  form!: FormGroup;

  constructor(private fb: FormBuilder,private paymentService:PaymentService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required,Validators.pattern('^[a-zA-Z ]+$')]],
      email: ['', [Validators.required, Validators.email]],
      tel: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      address: ['', Validators.required],
      city: ['', [Validators.required,Validators.pattern('^[a-zA-Z ]+$')]],
      state: ['', [Validators.required,Validators.pattern('^[a-zA-Z ]+$')]],
      zip_code: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      country: ['', [Validators.required,Validators.pattern('^[a-zA-Z ]+$')]],
      currency_type: ['', Validators.required],
      amount: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    });
  }
  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
      // this.initialPayment();
      this.paymentService.createOrder(this.form.value).subscribe((data:any)=>{
        console.log(data);
        this.initialPayment(data);
      });
    } else {
      console.log('Form is invalid');
    }
  }
  initialPayment(data:any) {
    const options = {
      key: 'rzp_test_dcPNl2y8w2p2Wh',
      amount: data.order.name,
      currency: data.order.currency,
      name: 'Quantum It Innovations',
      description: 'Test Transaction',
      order_id: data.order.id,
      modal: {
        // We should prevent closing of the form when esc key is pressed.
        escape: false,
      },
      handler:  (response: any)=> {
        alert(`Payment successful. Payment ID: ${response.razorpay_payment_id}`);
        this.paymentService.paymentSuccess(response).subscribe((data:any)=>{
          console.log(data);
        })
      },

      prefill: {
        name: data.transaction.name,
        email: data.transaction.email,
        contact: data.transaction.tel
      },
      theme: {
        color: '#3399cc'
      }
    };
    const rzp = new Razorpay(options);
    rzp.open();
  }
}
