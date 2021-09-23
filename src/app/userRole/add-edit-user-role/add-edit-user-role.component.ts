import { MatSnackBar } from '@angular/material/snack-bar';
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
  form: FormGroup;
  id: number;
  isAddMode: boolean;
  loading = false;
  submitted = false;
  UserRole: UserRole;
  userRoles: Observable<UserRole[]>;
  userid : number;

  constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private snack: MatSnackBar,
        private router: Router,
        private UserRoleService: UserRoleService,
  ) { }

  ngOnInit(): void {
    this.id = +this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    var ids = localStorage.getItem('user')
    const obj = JSON.parse(ids)
   console.log(obj.userId) 
   this.userid = obj.userId
    console.log(obj)

    const formOptions: AbstractControlOptions = { };
    this.form = this.formBuilder.group({
        userRoleName: ['', [Validators.required]],
        userRoleDescription: ['', [Validators.required, Validators.maxLength(50)]],
    }, formOptions);

    if (!this.isAddMode) {
    this.UserRoleService.getUserRoleByID(this.id).subscribe(res => {
      this.UserRole = res
      console.log(res)
      this.form = this.formBuilder.group({
        userRoleName: [this.UserRole.userRoleName, [Validators.required]],
        userRoleDescription: [this.UserRole.userRoleDescription, [Validators.required, Validators.maxLength(50)]],
  }, formOptions);
    })
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
    userRole.usersId = this.userid
    this.UserRoleService.CreateUserRole(userRole).subscribe(res =>{
      console.log(res)
      this.loading = false
      this.router.navigateByUrl('userRole');
    })
    this.snack.open('Successfully Added User Role! ', 'OK', 
    {
      verticalPosition: 'top',
      horizontalPosition: 'center',
      duration: 4000
    });
  }

  updateUserRole() {
    const userRole: UserRole = this.form.value;
    userRole.usersId = this.userid
    userRole.userRoleId = this.UserRole.userRoleId;
    this.UserRoleService.UpdateUserRole(userRole).subscribe(res =>{
      console.log(res)
      //this.form.reset();
      this.router.navigateByUrl('userRole');
    });
    this.snack.open('Successfully Updated User Role! ', 'OK', 
    {
      verticalPosition: 'top',
      horizontalPosition: 'center',
      duration: 4000
    });
  }

  Close() {
    this.form.reset();
    this.router.navigateByUrl('userRole');
  }
}
