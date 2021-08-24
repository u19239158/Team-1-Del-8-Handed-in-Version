// import { state, style } from '@angular/animations';
import { Component } from '@angular/core';
import { EventSettingsModel, View } from '@syncfusion/ej2-angular-schedule';
// import { DeliveryshiftService } from 'src/app/services/deliveryshift/deliveryshift.service';
// import { HttpClient } from '@angular/common/http';
// import { Deliveryshift } from 'src/app/interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent {

  title = 'NKAP Bolting';

  // deliveryshift: Deliveryshift[] = [];
  // DeliveryShift: Deliveryshift;

  // constructor(private deliveryshiftService: DeliveryshiftService,
  //     private httpClient: HttpClient
  // ) { }

  // public eventData: EventSettingsModel = {

  //   // this.deliveryshiftService.GetDeliveryShift().subscribe(res => {
  //   //   console.log(res)
  //   // }

  //   dataSource: [{

  //     Id: 1,

  //     Subject: 'Board Meeting',

  //     StartTime: new Date(2021, 10, 30, 9, 0),

  //     EndTime: new Date(2021, 10, 30, 11, 0)

  //   },
  //   {

  //     Id: 2,

  //     Subject: 'Training session on JSP',

  //     StartTime: new Date(2018, 10, 30, 15, 0),

  //     EndTime: new Date(2018, 10, 30, 17, 0)

  //   },

  //   {

  //     Id: 3,

  //     Subject: 'Sprint Planning with Team members',

  //     StartTime: new Date(2018, 10, 30, 9, 30),

  //     EndTime: new Date(2018, 10, 30, 11, 0)

  //   }]

}


/* Loop through all dropdown buttons to toggle between hiding and showing its dropdown content - This allows the user to have multiple dropdowns without any conflict */
var dropdown = document.getElementsByClassName("menu-item");
var i;

for (i = 0; i < dropdown.length; i++) {
  dropdown[i].addEventListener("click", function () {
    this.classList.toggle("active");
    var dropdownContent = this.nextElementSibling;
    if (dropdownContent.style.display === "block") {
      dropdownContent.style.display = "none";
    } else {
      dropdownContent.style.display = "block";
    }
  });
}

