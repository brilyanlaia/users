import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserList } from '../../models/user.model';
import { MatTableModule } from '@angular/material/table';
import { DEFAULT_COLUMNS } from '../../constant/default-columns.const';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [MatTableModule, MatProgressBarModule, MatCardModule],
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.scss',
})
export class UserTableComponent {
  @Input() users: UserList[] = [];
  @Input() displayedColumns: string[] = DEFAULT_COLUMNS;
  @Input() isLoading = false;
  @Input() isStacked = false;

  @Output() onRowClick = new EventEmitter<number>();

  constructor() {}

  handleRowClick(row: number) {
    this.onRowClick.emit(row);
  }
}
