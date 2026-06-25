import { Component, EventEmitter, Input, Output } from '@angular/core';

import { startOfDay } from '../../data/dashboard-calendar-day.resolver';
import { ViewerDay } from '../../data/dashboard-viewer-day';
import { DashboardUser } from '../../models/dashboard.models';
import { DashboardDatePickerComponent } from '../dashboard-date-picker/dashboard-date-picker.component';

@Component({
  selector: 'app-page-header',
  imports: [DashboardDatePickerComponent],
  templateUrl: './page-header.component.html',
})
export class PageHeaderComponent {
  @Input({ required: true }) user!: DashboardUser;
  @Input({ required: true }) viewerDay!: ViewerDay;
  @Input({ required: true }) calendarMinDate!: Date;
  @Input({ required: true }) calendarMaxDate!: Date;
  @Input({ required: true }) selectedDate!: Date;
  @Output() readonly selectedDateChange = new EventEmitter<Date>();

  get firstName(): string {
    return this.user.name.trim().split(/\s+/)[0] ?? this.user.name;
  }

  get timeGreeting(): string {
    const hour = new Date().getHours();
    if (hour < 12) {
      return 'Good morning, ';
    }
    if (hour < 17) {
      return 'Good afternoon, ';
    }
    return 'Good evening, ';
  }

  onSelectedDateChange(date: Date): void {
    this.selectedDateChange.emit(startOfDay(date));
  }
}
