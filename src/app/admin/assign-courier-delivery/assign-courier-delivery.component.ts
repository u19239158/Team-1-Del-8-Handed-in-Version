import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { Courier, OnlineSales } from 'src/app/interfaces';
import { GlobalConfirmComponent } from 'src/app/modals/globals/global-confirm/global-confirm.component';
import { AssignCourierDeliveryService } from 'src/app/services/assigncourierdelivery/assigncourierdelivery.service';
import { CourierService } from 'src/app/services/courier/courier.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-assign-courier-delivery',
  templateUrl: './assign-courier-delivery.component.html',
  styleUrls: ['./assign-courier-delivery.component.scss']
})
export class AssignCourierDeliveryComponent implements OnInit {

  //search code
  Couriers: Courier[];
  searchValue: string;

  // couriers: Courier[] = [];
  Courier: Courier;
  courier: Observable<Courier[]>;
  dataSource = new MatTableDataSource<Courier>();
  displayedColumns: string[] = ['name', 'type', 'contactNumber', 'actions'];
  CourierService: any;
  sale: any;
  OnlineSalesService: any;
  public couriers : any =[];
  public sales : any =[];
  id: number;
  public EmailData : any = [];
  
  constructor(private AssignCourierDeliveryService: AssignCourierDeliveryService,
    private snack: MatSnackBar,
    private router: Router,
    private dialog: MatDialog,
    private httpClient: HttpClient,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.id = +this.route.snapshot.params['id'];
    this.readCouriers();

    this.AssignCourierDeliveryService.GeCourier().subscribe((result: Courier[]) => {
      this.Couriers = result;
    });

  }

  readCouriers(): void {
    this.AssignCourierDeliveryService.GeCourier().subscribe(res => {
      console.log(res)
      this.dataSource = new MatTableDataSource(res)
    })
  }

  filter() {
    this.dataSource = new MatTableDataSource(this.Couriers.filter(c => c.courierTypeDescription.toLowerCase().includes(this.searchValue.toLowerCase())))
    this.dataSource = new MatTableDataSource(this.Couriers.filter(c => c.courierName.toLowerCase().includes(this.searchValue.toLowerCase())))
  }

  deleteCourier(Courier: Courier) {
    const confirm = this.dialog.open(GlobalConfirmComponent, {
      disableClose: true,
    });

    confirm.afterClosed().subscribe(res => {
      if (res) {
        this.AssignCourierDeliveryService.DeleteCourier(Courier).subscribe(res => {
          this.readCouriers()
        })
      }
    });
  }

  getEmail(courierID: any, saleId : any) {
    //CODE USED TO GET ID THROUGH BUTTON 64-67 & 30
  this.AssignCourierDeliveryService.getCourierByID(courierID).subscribe(data=>{
    this.couriers = data
    console.log(data)

    this.AssignCourierDeliveryService.GetFullSaleByID(this.id).subscribe(res=>{
      this.sales =res;
      console.log("Result" ,this.sales)});

    
    this.AssignCourierDeliveryService.NotifyCourier(this.sales,this.couriers.courierEmail).subscribe(res => {
      console.log(res)});
      this.snack.open('Courier Succesfully Assigned!', 'OK', 
      {
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
        duration: 2000
      });
  });
  }

  Done() {
    //CODE USED TO GET ID THROUGH BUTTON 64-67 & 30
    // this.AssignCourierDeliveryService.GetFullSaleByID(this.id).subscribe(res=>{
    //   this.sales =res;
    //   console.log("Result" ,this.sales)});
      
  this.AssignCourierDeliveryService.AssignCourier(this.id).subscribe(data=>{
    console.log(data)
   
    
  });



   // }) ||
  // this.AssignCourierDeliveryService.GetFullSaleByID(this.id).subscribe(data=>{
  //   this.sales =  data;
    
  // });console.log(this.couriers + this.sales)
  //   this.AssignCourierDeliveryService.GetFullSaleByID(this.id).subscribe(res=>{
  //     this.sales =res;
  //     console.log("Result" ,this.sales) 

  //   // this.AssignCourierDeliveryService.getCourierByID(this.couriers).subscribe(res =>{
  //   //   console.log(res)})
  //   // const EmailData = this.sales + this.couriers
  //   // console.log(EmailData)

  // Close() {
  //   this.form.reset();
  //   this.router.navigateByUrl('couriers');
  // }
}}
