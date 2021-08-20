import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pack-order',
  templateUrl: './pack-order.component.html',
  styleUrls: ['./pack-order.component.scss']
})
export class PackOrderComponent implements OnInit {
  form: FormGroup;
  id : number;
  loading = false;

  constructor(
    private router: Router,
    private route : ActivatedRoute,
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {

    if (this.form.invalid) {
      return; 
    } 
  }

  Close() {
    this.form.reset();
    this.router.navigateByUrl('/');
  }

}
