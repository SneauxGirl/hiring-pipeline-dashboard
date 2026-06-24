import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Select } from 'primeng/select';

import { StoryDateOption } from '../../data/dashboard-story-day.resolver';
import { DashboardUser } from '../../models/dashboard.models';

export type { StoryDateOption };

@Component({
  selector: 'app-page-header',
  imports: [FormsModule, Select],
  templateUrl: './page-header.component.html',
})
export class PageHeaderComponent {
  @Input({ required: true }) user!: DashboardUser;
  @Input({ required: true }) storyDates!: ReadonlyArray<StoryDateOption>;
  @Input({ required: true }) selectedDateKey!: string;
  @Output() readonly selectedDateKeyChange = new EventEmitter<string>();

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

  onDateChange(dateKey: string): void {
    this.selectedDateKeyChange.emit(dateKey);
  }
}
