import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-hdfc',
  templateUrl: './hdfc.component.html',
  styleUrls: ['./hdfc.component.scss']
})
export class HdfcComponent implements OnInit{

  form!: FormGroup;

  amountInINR!:number;

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
    this.form.get('amount')?.valueChanges.subscribe(value=>{
      if(this.form.value.currency_type){
        this.convertIntoINR(value,this.form.value?.currency_type);
      }
    });
    this.form.get('currency_type')?.valueChanges.subscribe(value=>{
      if(this.form.value.amount){
        this.convertIntoINR(this.form.value.amount,value);
      }
    });

  }
  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }
  convertIntoINR(amount:number,currency_type:string='INR'){
    if(currency_type!=''){
      this.paymentService.currencyAmountConvert(currency_type).subscribe((res:any)=>{
        console.log(res);
        this.amountInINR=amount*res.conversion_rates.INR;
      });
    }
    else{
      this.amountInINR=0;
    }
  }
  
}
