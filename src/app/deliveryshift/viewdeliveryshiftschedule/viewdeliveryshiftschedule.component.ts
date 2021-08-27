import { Component, OnInit } from '@angular/core';
import { EventSettingsModel, View } from '@syncfusion/ej2-angular-schedule';
import { DeliveryshiftService } from 'src/app/services/deliveryshift/deliveryshift.service';
import { HttpClient } from '@angular/common/http';
import { Deliveryshift } from 'src/app/interfaces';

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
    private httpClient: HttpClient
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

          StartTime: new Date(),

          EndTime: new Date(2021, 10, 30, 11, 0)

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

}
