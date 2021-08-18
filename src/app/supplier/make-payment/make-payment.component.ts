import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-make-payment',
  templateUrl: './make-payment.component.html',
  styleUrls: ['./make-payment.component.scss']
})
export class MakePaymentComponent implements OnInit {
  form: FormGroup;
  id: number;
  isAddMode: boolean;
  loading = false;
  submitted = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    ) { }

  ngOnInit(): void {
  }
  onSubmit(){

  }

  Close(){
    this.form.reset();
    this.router.navigateByUrl('supplier');
  }
}
