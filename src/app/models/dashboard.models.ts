import { PipResponsibility, PipRiskLevel } from '../theme/pip-tokens';

export type KpiTrendDirection = 'up' | 'down' | 'neutral';

/** Weekly KPI values — labels are in kpi.catalog.ts. */
export interface KpiWeekValues {
  value: string | number;
  valueUnit?: string;
  delta?: string;
  trend?: KpiTrendDirection;
}

export type ScheduleGroup = 'today' | 'tomorrow' | 'this-week';

export type ScheduleInterviewEntry = {
  id: string;
  timeLabel: string;
  group: ScheduleGroup;
  kind?: 'interview';
  candidateId: string;
};

export type SchedulePtoEntry = {
  id: string;
  group: ScheduleGroup;
  kind: 'pto';
};

export type ScheduleEntry = ScheduleInterviewEntry | SchedulePtoEntry;

export interface CandidateProfile {
  id: string;
  name: string;
  roleTitle: string;
  roleSpecs: string;
}

export interface WeekRangeOption {
  label: string;
  value: string;
}

/** Weekly bottleneck metrics — copy and icons are in bottleneck.catalog.ts. */
export interface BottleneckWeekMetrics {
  responsibility: PipResponsibility;
  candidateCount: number;
  avgMetric: number;
}

export type WorkforceTrendMetricId = 'attrition' | 'promotions' | 'transfers' | 'backfills';

/** Twelve monthly values per year — index 0 = January. */
export interface TrendSeriesWeekValues {
  currentYear: number[];
  priorYear: number[];
}

/** Weekly trend numbers — metric labels and chart years are in trends.catalog.ts. */
export interface TrendWeekData {
  /** 0–11 (Jan–Dec); months before this index use currentYear; this month onward use priorYear. */
  asOfMonthIndex: number;
  /** Calendar year for the viewed date (drives chart year labels). */
  calendarYear: number;
  series: Record<WorkforceTrendMetricId, TrendSeriesWeekValues>;
}

export interface WorkforceTrendSeries {
  id: WorkforceTrendMetricId;
  label: string;
  currentYear: number[];
  priorYear: number[];
}

/** View model built by TrendsComponent from TrendWeekData + trends.catalog.ts. */
export interface WorkforceTrends {
  currentYear: number;
  priorYear: number;
  asOfMonthIndex: number;
  series: WorkforceTrendSeries[];
}

export interface OpenRequisition {
  id: string;
  role: string;
  candidates: number;
  stage: string;
  responsibility: PipResponsibility;
  daysOpen: number;
  risk: PipRiskLevel;
}

export interface OpenRequisitionsData {
  items: OpenRequisition[];
  moreCount: number;
}

/** Weekly funnel stage values — stage keys and labels are in funnel.catalog.ts. */
export interface FunnelStageWeekData {
  count: number;
  conversionPct?: number;
}

export interface FunnelStage {
  stageKey: string;
  label: string;
  count: number;
  conversionPct?: number;
}

export interface StageDuration {
  fromStage: string;
  toStage: string;
  days: number;
}

export interface DashboardUser {
  name: string;
  title: string;
  avatarUrl: string;
}

/** Calendar-day-scoped dashboard mock payload (days 1–14; no user, nav, or trends). */
export interface DashboardDayData {
  kpis: KpiWeekValues[];
  schedule: ScheduleEntry[];
  candidates: CandidateProfile[];
  bottlenecks: BottleneckWeekMetrics[];
  openRequisitions: OpenRequisitionsData;
  funnelStages: FunnelStageWeekData[];
  stageDurationDays: number[];
}
