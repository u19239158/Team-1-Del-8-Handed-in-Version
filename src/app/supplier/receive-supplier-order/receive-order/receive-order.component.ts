// import { Component, OnInit } from '@angular/core';
// import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Router, ActivatedRoute } from '@angular/router';
// import { ReceiveSupplierOrder } from 'src/app/interfaces';
// import { Observable } from 'rxjs';
// import { ReceiveSupplierService } from 'src/app/services/supplier/receive-supplier-order';

// @Component({
//   selector: 'app-receive-order',
//   templateUrl: './receive-order.component.html',
//   styleUrls: ['./receive-order.component.scss']
// })
// export class ReceiveOrderComponent implements OnInit {
//   form: FormGroup;
//   id : number;
//   loading = false;
//   ReceiveSupplierOrder: ReceiveSupplierOrder;
//   receiveSupplierOrders: Observable<ReceiveSupplierOrder[]>;

//   constructor(
//     private router: Router,
//     private route : ActivatedRoute,
//     private receiveSupplierSerice: ReceiveSupplierService,
//     private FormBuilder : FormBuilder

//   ) { }

//   ngOnInit(): void {
//     const formOptions: AbstractControlOptions = { };
//     this.form = this.FormBuilder.group({
//       invoiceTotal: ['', [Validators.required]],
//       invoiceDate: ['', [Validators.required]],
//       orderDateReceived: ['', [Validators.required]],
//       invoiceNumber :['', [Validators.required]]
//     }, formOptions);
//   }

//   onSubmit() {

//     if (this.form.invalid) {
//       return;
//     }
//     if (this.loading = true)
//       {
//       // return this.writeOff();
//       }
//   }

//   receiveSupplierOrder() {
//     const receiveOrder: ReceiveSupplierOrder = this.form.value;
//     this.receiveSupplierSerice.ReceiveSupplierOrder(receiveOrder).subscribe(res => {
//       console.log(res)
//       this.loading = false;
//       this.router.navigateByUrl('receiveSupplierOrder');
//     })
//   }


//   Close() {
//     this.form.reset();
//     this.router.navigateByUrl('receiveSupplierOrder');
//   }
// }