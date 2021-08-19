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
    this.id = +this.route.snapshot.params['id'];
  }
  onSubmit(){
    if (this.form.invalid) {
      return;
    }
  }

  Close(){
    this.form.reset();
    this.router.navigateByUrl('supplier');
  }
}
