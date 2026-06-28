import { NgTemplateOutlet } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';
import { Dialog } from 'primeng/dialog';

import {
  dashboardCardStretchPt,
  dashboardCardStretchStyleClass,
} from '../../config/dashboard-layout';
import {
  addCalendarDays,
  isSameDay,
} from '../../data/dashboard-calendar-day.resolver';
import {
  CandidateProfile,
  ScheduleEntry,
  ScheduleGroup,
  SchedulePtoEntry,
} from '../../models/dashboard.models';
import { NA_SCHEDULE_COPY, PTO_SCHEDULE_COPY } from './schedule.catalog';

interface ScheduleGroupConfig {
  key: ScheduleGroup;
  label: string;
}

@Component({
  selector: 'app-schedule',
  imports: [Button, Card, Dialog, NgTemplateOutlet],
  templateUrl: './schedule.component.html',
})
export class ScheduleComponent {
  readonly cardStyleClass = dashboardCardStretchStyleClass('schedule-card');
  readonly cardPt = dashboardCardStretchPt();

  @Input({ required: true }) schedule: ScheduleEntry[] = [];
  @Input({ required: true }) candidates: CandidateProfile[] = [];
  @Input({ required: true }) selectedDate!: Date;
  @Input({ required: true }) viewerDate!: Date;
  @Input() embedded = false;

  private readonly scheduleDayLabel = new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'numeric',
    day: 'numeric',
  });

  dialogVisible = false;
  selectedCandidate: CandidateProfile | null = null;

  readonly ptoCopy = PTO_SCHEDULE_COPY;
  readonly naCopy = NA_SCHEDULE_COPY;

  readonly groupConfigs: ScheduleGroupConfig[] = [
    { key: 'today', label: 'Today' },
    { key: 'tomorrow', label: 'Tomorrow' },
    { key: 'this-week', label: 'This Week' },
  ];

  groupLabel(group: ScheduleGroupConfig): string {
    if (isSameDay(this.selectedDate, this.viewerDate)) {
      return group.label;
    }

    switch (group.key) {
      case 'today':
        return this.formatScheduleDay(this.selectedDate);
      case 'tomorrow':
        return this.formatScheduleDay(addCalendarDays(this.selectedDate, 1));
      case 'this-week':
        return 'Remaining Week';
      default:
        return group.label;
    }
  }

  private formatScheduleDay(date: Date): string {
    const parts = this.scheduleDayLabel.formatToParts(date);
    const weekday = parts.find((part) => part.type === 'weekday')?.value ?? '';
    const month = parts.find((part) => part.type === 'month')?.value ?? '';
    const day = parts.find((part) => part.type === 'day')?.value ?? '';
    return `${weekday} ${month}/${day}`;
  }

  entriesForGroup(group: ScheduleGroup): ScheduleEntry[] {
    return this.schedule.filter((entry) => entry.group === group);
  }

  isPto(entry: ScheduleEntry): entry is SchedulePtoEntry {
    return entry.kind === 'pto';
  }

  candidateFor(entry: ScheduleEntry): CandidateProfile | undefined {
    if (this.isPto(entry)) {
      return undefined;
    }

    return this.candidates.find((candidate) => candidate.id === entry.candidateId);
  }

  openCandidate(candidateId: string): void {
    const candidate = this.candidates.find((entry) => entry.id === candidateId);
    if (!candidate) {
      return;
    }

    this.selectedCandidate = candidate;
    this.dialogVisible = true;
  }

  closeCandidateDialog(): void {
    this.dialogVisible = false;
    this.selectedCandidate = null;
  }
}
