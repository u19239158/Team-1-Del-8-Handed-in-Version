import { UserRoleService } from '../../services/user-role/user-role.service';
import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserRole } from 'src/app/interfaces';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-edit-user-role',
  templateUrl: './add-edit-user-role.component.html',
  styleUrls: ['./add-edit-user-role.component.scss']
})
export class AddEditUserRoleComponent implements OnInit {

  dataSaved = false;
  form: FormGroup;
  id: number;
  isAddMode: boolean;
  loading = false;
  submitted = false;
  userRole: UserRole;
  allUserRoles: Observable<UserRole[]>;
  employeeIdUpdate = null;
  massage = null;
  userRoleId: string;

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
        userRoleName: ['', [Validators.required]],
        userRoleDescription: ['', [Validators.required, Validators.maxLength(50)]],
    }, formOptions);

    if (!this.isAddMode) {
      // this.userRole = this.UserRoleService.getUserRoleById(this.userRoleId);

        this.form = this.formBuilder.group({
          userRoleName: [this.userRole.userRoleName, [Validators.required]],
          userRoleDescription: [this.userRole.userRoleDescription, [Validators.required, Validators.maxLength(50)]],
    }, formOptions);
    }
  }

  onSubmit() {

    if (this.form.invalid) {
      return;
    }

    // this.loading = true;
    // if (this.isAddMode) {
    //     this.createUserRole();
    // } else {
    //      this.updateUserRole();
    // }
  }
  updateUserRole() {
    throw new Error('Method not implemented.');
  }

  // createUserRole() {
  //   const userRole: UserRole = this.form.value;
  //   this.UserRoleService.addUserRole(userRole);
  //   this.router.navigateByUrl('userRoleAdd');
  // }

  createUserRole(UserRole: UserRole) {
    if (this.updateUserRole == null) {
      this.UserRoleService.createUserRole(this.userRole).subscribe(
        () => {
          this.dataSaved = true;
          this.massage = 'Record saved Successfully';
          this.form.reset();
        }
      );
    } else {
      this.userRole.userRoleId = this.employeeIdUpdate;
      this.UserRoleService.updateUserRole(this.userRole).subscribe(() => {
        this.dataSaved = true;
        this.massage = 'Record Updated Successfully';
        this.form.reset();
      });
    }
  }

  // updateUserRole() {
  //   const userRole: UserRole = this.form.value;
  //   userRole.id = this.userRole.id;
  //   this.UserRoleService.updateUserRole(userRole);
  //   this.form.reset();
  //   this.router.navigateByUrl('userRoleEdit');
  // }


  // Close() {
  //   this.form.reset();
  //   this.router.navigateByUrl('userRole');
  // }

  Close() {
    this.form.reset();
    this.massage = null;
    this.dataSaved = false;
    this.router.navigateByUrl('userRole');
  }

}
