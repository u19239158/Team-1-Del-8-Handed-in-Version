import { UserRoleService } from '../../services/user-role/user-role.service';
import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserRole } from 'src/app/interfaces';

@Component({
  selector: 'app-add-edit-user-role',
  templateUrl: './add-edit-user-role.component.html',
  styleUrls: ['./add-edit-user-role.component.scss']
})
export class AddEditUserRoleComponent implements OnInit {

  form: FormGroup;
  id: number;
  isAddMode: boolean;
  loading = false;
  submitted = false;
  userRole: UserRole;

  constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private UserRoleService: UserRoleService,
  ) { }

  ngOnInit(): void {
    this.id = +this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    const formOptions: AbstractControlOptions = { };
    this.form = this.formBuilder.group({
        userRoleName: ['', Validators.required],
        userRoleDescription: ['', Validators.required],
    }, formOptions);

    if (!this.isAddMode) {
      this.userRole = this.UserRoleService.getUserRoleById(this.id);

        this.form = this.formBuilder.group({
          userRoleName: [this.userRole.userRoleName, Validators.required],
          userRoleDescription: [this.userRole.userRoleDescription, Validators.required],
    }, formOptions);
    }
  }

  onSubmit() {

    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    if (this.isAddMode) {
        this.createUserRole();
    } else {
        this.updateUserRole();
    }
  }

  createUserRole() {
    const userRole: UserRole = this.form.value;
    this.UserRoleService.addUserRole(userRole);
    this.router.navigateByUrl('userRoleAdd');
  }

  updateUserRole() {
    const userRole: UserRole = this.form.value;
    userRole.id = this.userRole.id;
    this.UserRoleService.updateUserRole(userRole);
    this.form.reset();
    this.router.navigateByUrl('userRoleEdit');
  }


  Close() {
    this.form.reset();
    this.router.navigateByUrl('');
  }

}
