import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../shared/services/user-service.service';
import { UserDetail } from '../../shared/models/user.model';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { UtilityService } from '../../shared/services/utility.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [
    HttpClientModule,
    MatIconModule,
    MatProgressBarModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
  providers: [UserService],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss',
})
export class UserDetailComponent implements OnInit {
  userDetail: UserDetail = new UserDetail();
  isLoading = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private utilityService: UtilityService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this._getUserDetail(params['id']);
      }
    });
  }

  goBack() {
    this.router.navigate(['/users']);
  }

  private _getUserDetail(id: number) {
    this.isLoading = true;
    this.userService.getUserById(id).subscribe(
      (res) => {
        this.userDetail = res;
        this.isLoading = false;
      },
      (err) => {
        this.snackBar.open(this.utilityService.getErrorMessage(err), 'Close', {
          duration: 2000,
        });
      }
    );
  }
}
