import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
enum CheckBoxType { READY_FOR_COLLECTION, READY_FOR_DELIVERY, NONE };

@Component({
  selector: 'app-pack-order',
  templateUrl: './pack-order.component.html',
  styleUrls: ['./pack-order.component.scss']
})
export class PackOrderComponent implements OnInit {
  form: FormGroup;
  id: number;
  loading = false;
  checked = false; labelPosition: 'before' | 'after' = 'after';
  disabled = false;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) { }

  ngOnInit(): void {

  }

  check_box_type = CheckBoxType;
  currentlyChecked: CheckBoxType;

  selectCheckBox(targetType: CheckBoxType) {
    // If the checkbox was already checked, clear the currentlyChecked variable
    if (this.currentlyChecked === targetType) {
      this.currentlyChecked = CheckBoxType.NONE;
      return;
    }

    this.currentlyChecked = targetType;
  }

  onSubmit() {

    if (this.form.invalid) {
      return;
    }
  }

  Close() {
    this.form.reset();
    this.router.navigateByUrl('viewSale');
  }

}
