import { Component, OnInit } from '@angular/core';
import { EventSettingsModel, View } from '@syncfusion/ej2-angular-schedule';
import { DeliveryshiftService } from 'src/app/services/deliveryshift/deliveryshift.service';
import { HttpClient } from '@angular/common/http';
import { Deliveryshift, OnlineSales } from 'src/app/interfaces';
import * as moment from 'moment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viewdeliveryshiftschedule',
  templateUrl: './viewdeliveryshiftschedule.component.html',
  styleUrls: ['./viewdeliveryshiftschedule.component.scss']
})
export class ViewdeliveryshiftscheduleComponent {

  deliveryshift: Deliveryshift[] = [];
  DeliveryShift: Deliveryshift;
  newData = [];

  constructor(private deliveryshiftService: DeliveryshiftService,
    private httpClient: HttpClient,
    private router: Router,
  ) {
    this.readDeliveryshifts()
  }

  readDeliveryshifts(): void {
    this.deliveryshiftService.GetDeliveryShift().subscribe(res => {
      console.log("res4", res)


      for (let i = 0; i < res.length; i++) {
        const item = res[i]
        this.newData.push({

          Id: 1,

          Subject: item.employeeName,

          //(yyyy,  (mm+1),  dd, hr,mm):For Both Dates
          StartTime: moment(moment(item.dayOfTheWeek + ' ' + item.startTime).utc().toDate()).format('DD/MM/YYYY HH:mm:ss'),

          EndTime: moment(moment(item.dayOfTheWeek + ' ' + item.endTime).utc().toDate()).format('DD/MM/YYYY HH:mm:ss'),

          Location: (item.addressLine1 + ' ' + item.addressLine2 + ' ' + item.addressLine3),

          Description: item.saleId,
          // Description: moment(item.customerName + '' + item.customerSurname+''+item.customerBusinessName)

        })
      }
    })
  }

  public eventData: EventSettingsModel = {

    // this.deliveryshiftService.GetDeliveryShift().subscribe(res => {
    //   console.log(res)
    // }

    dataSource: this.newData


  }

  ToTable() {
    this.router.navigateByUrl('viewEmployeeDeliveryShifts');
  }

}
