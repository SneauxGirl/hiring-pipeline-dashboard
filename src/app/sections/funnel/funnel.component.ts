import { DecimalPipe, NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Card } from 'primeng/card';

import {
  dashboardCardStretchPt,
  dashboardCardStretchStyleClass,
} from '../../config/dashboard-layout';
import {
  FUNNEL_DURATION_SEGMENTS,
  FUNNEL_STAGE_DEFINITIONS,
} from './funnel.catalog';
import { FunnelStage, FunnelStageWeekData, StageDuration } from '../../models/dashboard.models';
import {
  funnelBarColor,
  funnelBarLabelColor,
  funnelBarSurfaceStyle,
  funnelDurationGlassStyle,
  funnelDurationSurfaceStyle,
  onSolidSurfaceTextColor,
} from '../../theme/theme-colors';

@Component({
  selector: 'app-funnel',
  imports: [Card, DecimalPipe, NgStyle],
  templateUrl: './funnel.component.html',
  styles: `
    :host {
      display: block;
    }

    .funnel-stage-bar {
      min-width: 0;
      max-width: 100%;
    }
  `,
})
export class FunnelComponent {
  readonly cardStyleClass = dashboardCardStretchStyleClass('funnel-card');
  readonly cardPt = dashboardCardStretchPt();

  @Input({ required: true }) funnelStageValues: FunnelStageWeekData[] = [];
  @Input({ required: true }) stageDurationDays: number[] = [];

  get funnelStages(): FunnelStage[] {
    return FUNNEL_STAGE_DEFINITIONS.map((definition, index) => ({
      stageKey: definition.stageKey,
      label: definition.label,
      count: this.funnelStageValues[index]?.count ?? 0,
      conversionPct: this.funnelStageValues[index]?.conversionPct,
    }));
  }

  get stageDurations(): StageDuration[] {
    return FUNNEL_DURATION_SEGMENTS.map((segment, index) => ({
      fromStage: segment.fromStage,
      toStage: segment.toStage,
      days: this.stageDurationDays[index] ?? 0,
    }));
  }

  get maxCount(): number {
    const peak = Math.max(0, ...this.funnelStages.map((stage) => stage.count));
    return peak > 0 ? peak : 1;
  }

  get totalDurationDays(): number {
    return this.stageDurations.reduce((sum, segment) => sum + segment.days, 0);
  }

  barWidthPct(count: number): number {
    if (this.maxCount === 0) {
      return 0;
    }

    return (count / this.maxCount) * 100;
  }

  barColor(index: number): string {
    return funnelBarColor(index);
  }

  barSurfaceStyle(index: number): Record<string, string> {
    return funnelBarSurfaceStyle(index);
  }

  stageTitle(stage: FunnelStage): string {
    return `${stage.stageKey}. ${stage.label}`;
  }

  stageConversionText(stage: FunnelStage): string {
    if (stage.conversionPct === undefined) {
      return '--';
    }

    return `${stage.conversionPct}%`;
  }

  durationLabel(index: number): string {
    return FUNNEL_STAGE_DEFINITIONS[index]?.stageKey ?? `h${index + 1}`;
  }

  segmentSolidColor(index: number): string {
    return funnelDurationGlassStyle(index).ink;
  }

  segmentTextColor(): string {
    return onSolidSurfaceTextColor();
  }

  segmentBarStyle(index: number, isLast: boolean): Record<string, string> {
    const surface = funnelDurationSurfaceStyle(index);
    const solid = funnelDurationGlassStyle(index).ink;

    return {
      background: surface.background,
      boxShadow: surface.boxShadow,
      flex: `${this.stageDurations[index]?.days ?? 0} 1 0`,
      borderStyle: 'solid',
      borderColor: solid,
      borderTopWidth: '1px',
      borderBottomWidth: '1px',
      borderLeftWidth: index === 0 ? '1px' : '0',
      borderRightWidth: isLast ? '1px' : '0',
    };
  }

  showSegmentLabel(days: number): boolean {
    if (this.totalDurationDays === 0) {
      return false;
    }

    const widthPct = (days / this.totalDurationDays) * 100;
    return widthPct >= 5;
  }

  barLabelColor(index: number): string {
    return funnelBarLabelColor(index);
  }
}
