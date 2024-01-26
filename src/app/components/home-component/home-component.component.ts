import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserTableComponent } from '../../shared/components/user-table/user-table.component';
import { UserList } from '../../shared/models/user.model';
import { UserService } from '../../shared/services/user-service.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UtilityService } from '../../shared/services/utility.service';
import { MatButtonModule } from '@angular/material/button';
import { DEFAULT_COLUMNS } from '../../shared/constant/default-columns.const';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-home-component',
  standalone: true,
  imports: [
    UserTableComponent,
    MatSnackBarModule,
    HttpClientModule,
    MatButtonModule,
  ],
  providers: [UserService],
  templateUrl: './home-component.component.html',
  styleUrl: './home-component.component.scss',
})
export class HomeComponentComponent implements OnInit, OnDestroy {
  userList: UserList[] = [];
  isLoading = false;
  displayedColumns = DEFAULT_COLUMNS;
  extraColumn = ['phone', 'username'];
  isMobile = false;
  isStacked = false;
  isMore = false;

  private $destroy = new Subject();

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
    private utilityService: UtilityService,
    private breakPointObserver: BreakpointObserver,
    private router: Router
  ) {}

  ngOnInit() {
    this.breakPointObserver
      .observe(['(max-width: 440px)'])
      .pipe(takeUntil(this.$destroy))
      .subscribe((res) => {
        this.isMobile = res.matches;
      });
    this._getUserList();
  }

  ngOnDestroy(): void {
    this.$destroy.next(true);
    this.$destroy.complete();
  }

  showMore() {
    this.isMore = true;
    this.displayedColumns = [
      ...new Set([...this.extraColumn, ...this.displayedColumns]),
    ];
  }

  showLess() {
    this.isMore = false;
    this.displayedColumns = DEFAULT_COLUMNS;
  }

  showStacked() {
    this.isStacked = true;
  }

  showTable() {
    this.isStacked = false;
  }

  handleRowClick(event: number) {
    this.router.navigate([`/user/${event}`]);
  }

  private _getUserList() {
    this.isLoading = true;
    this.userService
      .getUserList()
      .pipe(takeUntil(this.$destroy))
      .subscribe(
        (users) => {
          this.userList = users;
          this.isLoading = false;
          this.snackBar.open('User list fetched successfully', 'Close', {
            duration: 2000,
          });
        },
        (err) => {
          this.snackBar.open(
            this.utilityService.getErrorMessage(err),
            'Close',
            {
              duration: 2000,
            }
          );
          this.isLoading = false;
        }
      );
  }
}
