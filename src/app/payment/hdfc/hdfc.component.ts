import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PaymentService } from 'src/app/services/payment.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-hdfc',
  templateUrl: './hdfc.component.html',
  styleUrls: ['./hdfc.component.scss']
})
export class HdfcComponent implements OnInit {
  @ViewChild('form1') form1!: ElementRef;

  form!: FormGroup;

  amountInINR!: number;
  encRequest!: String;
  accessCode!: String;
  constructor(private fb: FormBuilder, private paymentService: PaymentService, private http: HttpClient) { }

  ngOnInit(): void {
    this.accessCode = 'AVYN84GD98CE46NYEC';
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      email: ['', [Validators.required, Validators.email]],
      tel: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      address: ['', Validators.required],
      city: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      state: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      zip_code: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      country: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      currency_type: ['', Validators.required],
      amount: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    });
    this.form.get('amount')?.valueChanges.subscribe(value => {
      if (this.form.value.currency_type) {
        this.convertIntoINR(value, this.form.value?.currency_type);
      }
    });
    this.form.get('currency_type')?.valueChanges.subscribe(value => {
      if (this.form.value.amount) {
        this.convertIntoINR(this.form.value.amount, value);
      }
    });

  }
  onSubmit() {
    this.form1.nativeElement.submit()
    if (this.form.valid) {

      const formData = this.form.value;
      this.http.post('http://localhost:5000/ccavRequestHandler', formData).subscribe(
        (response: any) => {
          console.log('Payment request sent successfully', response);
          // Handle response as needed (e.g., redirect to payment gateway)
        },
        (error: any) => {
          console.error('Error sending payment request', error);
          // Handle error (e.g., show error message)
        }
      );
    }
  }
  convertIntoINR(amount: number, currency_type: string = 'INR') {
    if (currency_type != '') {
      this.paymentService.currencyAmountConvert(currency_type).subscribe((res: any) => {
        console.log(res);
        this.amountInINR = amount * res.conversion_rates.INR;
      });
    }
    else {
      this.amountInINR = 0;
    }
  }

}
