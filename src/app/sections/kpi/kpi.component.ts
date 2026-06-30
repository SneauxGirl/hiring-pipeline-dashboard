import { Component, Input } from '@angular/core';
import { Card } from 'primeng/card';
import { Tooltip } from 'primeng/tooltip';

import { KPI_DEFINITIONS } from './kpi.catalog';
import { KpiWeekValues, KpiTrendDirection } from '../../models/dashboard.models';

type KpiView = KpiWeekValues & { label: string };

@Component({
  selector: 'app-kpi',
  imports: [Card, Tooltip],
  templateUrl: './kpi.component.html',
})
export class KpiComponent {
  @Input({ required: true }) kpiValues: KpiWeekValues[] = [];

  get kpis(): KpiView[] {
    return KPI_DEFINITIONS.map((definition, index) => ({
      label: definition.label,
      ...this.kpiValues[index],
    }));
  }

  trendIcon(trend?: KpiTrendDirection): string | null {
    switch (trend) {
      case 'up':
        return 'pi pi-arrow-up-right';
      case 'down':
        return 'pi pi-arrow-down';
      default:
        return null;
    }
  }

  deltaAccessibleLabel(kpi: KpiView): string {
    if (!kpi.delta) {
      return '';
    }

    const delta = kpi.delta.trim();
    const isTimeToFill = kpi.valueUnit === 'days';

    switch (kpi.trend) {
      case 'up':
        return isTimeToFill ? `Increased: ${delta}` : `Increased by ${delta}`;
      case 'down':
        return isTimeToFill ? `Decreased: ${delta}` : `Decreased by ${delta}`;
      default:
        return isTimeToFill ? 'On Target' : delta;
    }
  }
}
