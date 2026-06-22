import { DashboardWeekData } from '../models/dashboard.models';
import { stageDurationDaysForWeek, trendsForWeek } from './dashboard-trends.mock';
import { DashboardWeekKey } from './dashboard-weeks.mock';

function week(
  weekKey: DashboardWeekKey,
  data: Omit<DashboardWeekData, 'trends' | 'stageDurationDays'>,
): DashboardWeekData {
  return {
    ...data,
    trends: trendsForWeek(weekKey),
    stageDurationDays: stageDurationDaysForWeek(weekKey),
  };
}

function pct(current: number, previous: number): number {
  if (previous === 0) return 0;

  return Number(((current / previous) * 100).toFixed(2));
}

function funnelStages(counts: readonly [number, number, number, number, number, number]) {
  return counts.map((count, index) =>
    index === 0 ? { count } : { count, conversionPct: pct(count, counts[index - 1]) },
  );
}

/**
 * Funnel is ACTIVE pipeline, not YTD.
 *
 * These counts represent candidates currently sitting in each stage across the
 * visible requisitions plus the hidden requisitions represented by `moreCount`.
 *
 * Stage mapping:
 * - Application -> Applicants
 * - Screening -> Screened
 * - Assessment -> Assessment
 * - Interview + Final Round -> Interviews
 * - Offer -> Offer
 * - Hired -> Hired
 *
 * The Offer Acceptance KPI should match the active funnel's Offer -> Hired rate.
 */
const ACTIVE_FUNNEL_BY_WEEK: Record<DashboardWeekKey, readonly [number, number, number, number, number, number]> = {
  // Visible reqs only: Product Designer + Data Analyst in Screening;
  // Frontend + Backend in Assessment.
  '2026-06-01': [0, 1715, 1160, 0, 0, 0],

  // Visible reqs only: Marketing in Screening; Designer + Data Analyst in Assessment;
  // Frontend + Backend in Interview.
  '2026-06-08': [0, 967, 1047, 181, 0, 0],

  // Visible reqs plus 2 hidden offer-stage reqs:
  // Hidden: People Ops Offer 2, Customer Success Manager Offer 1.
  '2026-06-15': [1042, 0, 1056, 99, 3, 0],

  // Visible reqs plus 2 hidden reqs:
  // Hidden: People Ops Hired 1, Customer Success Manager Offer 1.
  '2026-06-22': [0, 0, 0, 156, 5, 1],

  // Visible reqs plus 3 hidden reqs:
  // Hidden: People Ops Hired 1, Customer Success Manager Hired 1,
  // Recruiting Operations Coordinator Screening 884.
  '2026-06-29': [0, 884, 0, 87, 3, 2],
};

export const MOCK_DASHBOARD_BY_WEEK: Record<DashboardWeekKey, DashboardWeekData> = {
  '2026-06-01': week('2026-06-01', {
    kpis: [
      { value: 4, delta: '0 this month', trend: 'neutral' },
      { value: 41, valueUnit: 'days', delta: '2 days', trend: 'up' },
      { value: 87, valueUnit: '%', delta: 'No change', trend: 'neutral' },
      { value: 6, delta: '2 versus previous month', trend: 'up' },
    ],
    openRequisitions: {
      items: [
        {
          id: 'r1',
          role: 'Senior Frontend Engineer',
          candidates: 612,
          stage: 'Assessment',
          responsibility: 'waiting-on-recruiter',
          daysOpen: 18,
          risk: 'medium',
        },
        {
          id: 'r2',
          role: 'Product Designer',
          candidates: 894,
          stage: 'Screening',
          responsibility: 'candidates-aging',
          daysOpen: 24,
          risk: 'medium',
        },
        {
          id: 'r4',
          role: 'Backend Engineer',
          candidates: 548,
          stage: 'Assessment',
          responsibility: 'waiting-on-recruiter',
          daysOpen: 21,
          risk: 'medium',
        },
        {
          id: 'r5',
          role: 'Data Analyst',
          candidates: 821,
          stage: 'Screening',
          responsibility: 'waiting-on-me',
          daysOpen: 16,
          risk: 'low',
        },
      ],
      moreCount: 0,
    },
    candidates: [],
    schedule: [
      { id: 'pto-0601-today', kind: 'pto', group: 'today' },
      { id: 'pto-0601-tomorrow', kind: 'pto', group: 'tomorrow' },
      { id: 'pto-0601-week', kind: 'pto', group: 'this-week' },
    ],
    bottlenecks: [
      { responsibility: 'waiting-on-me', candidateCount: 7, avgMetric: 8.1 },
      { responsibility: 'waiting-on-recruiter', candidateCount: 8, avgMetric: 5.6 },
      { responsibility: 'candidates-aging', candidateCount: 15, avgMetric: 20.4 },
    ],
    funnelStages: funnelStages(ACTIVE_FUNNEL_BY_WEEK['2026-06-01']),
  }),

  '2026-06-08': week('2026-06-08', {
    kpis: [
      { value: 5, delta: '1 this month', trend: 'up' },
      { value: 39, valueUnit: 'days', delta: '2 days', trend: 'down' },
      { value: 87, valueUnit: '%', delta: 'No change', trend: 'neutral' },
      { value: 6, delta: 'no change', trend: 'neutral' },
    ],
    openRequisitions: {
      items: [
        {
          id: 'r1',
          role: 'Senior Frontend Engineer',
          candidates: 97,
          stage: 'Interview',
          responsibility: 'waiting-on-me',
          daysOpen: 25,
          risk: 'medium',
        },
        {
          id: 'r2',
          role: 'Product Designer',
          candidates: 541,
          stage: 'Assessment',
          responsibility: 'waiting-on-recruiter',
          daysOpen: 31,
          risk: 'medium',
        },
        {
          id: 'r3',
          role: 'Marketing Manager',
          candidates: 967,
          stage: 'Screening',
          responsibility: 'candidates-aging',
          daysOpen: 24,
          risk: 'medium',
        },
        {
          id: 'r4',
          role: 'Backend Engineer',
          candidates: 84,
          stage: 'Interview',
          responsibility: 'waiting-on-recruiter',
          daysOpen: 28,
          risk: 'medium',
        },
        {
          id: 'r5',
          role: 'Data Analyst',
          candidates: 506,
          stage: 'Assessment',
          responsibility: 'waiting-on-me',
          daysOpen: 23,
          risk: 'low',
        },
      ],
      moreCount: 0,
    },
    candidates: [
      {
        id: 'c-nina-walker',
        name: 'Nina Walker',
        roleTitle: 'Senior Frontend Engineer',
        roleSpecs: 'Senior frontend engineer with Angular and component-library ownership.',
      },
      {
        id: 'c-daniel-kim',
        name: 'Daniel Kim',
        roleTitle: 'Backend Engineer',
        roleSpecs: 'Backend engineer with API, database, and service reliability experience.',
      },
      {
        id: 'c-aisha-robinson',
        name: 'Aisha Robinson',
        roleTitle: 'Senior Frontend Engineer',
        roleSpecs:
          'Frontend lead with accessibility, state management, and UI architecture experience.',
      },
    ],
    schedule: [
      { id: 'i-0608-1', timeLabel: '9:30 AM', group: 'today', candidateId: 'c-nina-walker' },
      { id: 'i-0608-2', timeLabel: '12:00 PM', group: 'today', candidateId: 'c-daniel-kim' },
      { id: 'i-0608-3', timeLabel: '2:30 PM', group: 'tomorrow', candidateId: 'c-aisha-robinson' },
    ],
    bottlenecks: [
      { responsibility: 'waiting-on-me', candidateCount: 6, avgMetric: 7.4 },
      { responsibility: 'waiting-on-recruiter', candidateCount: 7, avgMetric: 4.9 },
      { responsibility: 'candidates-aging', candidateCount: 13, avgMetric: 18.8 },
    ],
    funnelStages: funnelStages(ACTIVE_FUNNEL_BY_WEEK['2026-06-08']),
  }),

  '2026-06-15': week('2026-06-15', {
    kpis: [
      { value: 7, delta: '3 this month', trend: 'up' },
      { value: 34, valueUnit: 'days', delta: '5 days', trend: 'down' },
      { value: 87, valueUnit: '%', delta: 'No change', trend: 'neutral' },
      { value: 6, delta: '3 active offers', trend: 'up' },
    ],
    openRequisitions: {
      items: [
        {
          id: 'r1',
          role: 'Senior Frontend Engineer',
          candidates: 14,
          stage: 'Final Round',
          responsibility: 'waiting-on-me',
          daysOpen: 32,
          risk: 'low',
        },
        {
          id: 'r2',
          role: 'Product Designer',
          candidates: 72,
          stage: 'Interview',
          responsibility: 'waiting-on-recruiter',
          daysOpen: 38,
          risk: 'medium',
        },
        {
          id: 'r3',
          role: 'Marketing Manager',
          candidates: 561,
          stage: 'Assessment',
          responsibility: 'candidates-aging',
          daysOpen: 31,
          risk: 'medium',
        },
        {
          id: 'r4',
          role: 'Backend Engineer',
          candidates: 13,
          stage: 'Final Round',
          responsibility: 'waiting-on-me',
          daysOpen: 35,
          risk: 'medium',
        },
        {
          id: 'r5',
          role: 'Data Analyst',
          candidates: 495,
          stage: 'Assessment',
          responsibility: 'candidates-aging',
          daysOpen: 30,
          risk: 'medium',
        },
      ],
      moreCount: 2,
    },
    candidates: [
      {
        id: 'c-sarah-chen',
        name: 'Sarah Chen',
        roleTitle: 'Senior Frontend Engineer',
        roleSpecs:
          '5+ years building responsive web apps with Angular or React. Leads UI implementation, mentors junior engineers, and partners with design on component systems.',
      },
      {
        id: 'c-mike-davis',
        name: 'Mike Davis',
        roleTitle: 'Product Designer',
        roleSpecs:
          'End-to-end product designer with strong UX research and visual design skills. Portfolio should show mobile-first flows and design-system work.',
      },
      {
        id: 'c-priya-shah',
        name: 'Priya Shah',
        roleTitle: 'Product Designer',
        roleSpecs:
          'Product designer with mobile-first UX, research synthesis, and design-system experience.',
      },
      {
        id: 'c-grace-lee',
        name: 'Grace Lee',
        roleTitle: 'Senior Frontend Engineer',
        roleSpecs: 'Senior UI engineer with component architecture and mentoring experience.',
      },
    ],
    schedule: [
      { id: 'i-0615-1', timeLabel: '10:00 AM', group: 'today', candidateId: 'c-sarah-chen' },
      { id: 'i-0615-2', timeLabel: '1:30 PM', group: 'today', candidateId: 'c-mike-davis' },
      { id: 'i-0615-3', timeLabel: '3:00 PM', group: 'today', candidateId: 'c-priya-shah' },
      { id: 'i-0615-4', timeLabel: '11:00 AM', group: 'tomorrow', candidateId: 'c-grace-lee' },
    ],
    bottlenecks: [
      { responsibility: 'waiting-on-me', candidateCount: 4, avgMetric: 6.2 },
      { responsibility: 'waiting-on-recruiter', candidateCount: 6, avgMetric: 4.1 },
      { responsibility: 'candidates-aging', candidateCount: 9, avgMetric: 17.3 },
    ],
    funnelStages: funnelStages(ACTIVE_FUNNEL_BY_WEEK['2026-06-15']),
  }),

  '2026-06-22': week('2026-06-22', {
    kpis: [
      { value: 7, delta: '3 this month', trend: 'up' },
      { value: 33, valueUnit: 'days', delta: '1 day', trend: 'down' },
      { value: 89, valueUnit: '%', delta: '2% acceptance', trend: 'up' },
      { value: 6, delta: '5 active offers', trend: 'up' },
    ],
    openRequisitions: {
      items: [
        {
          id: 'r1',
          role: 'Senior Frontend Engineer',
          candidates: 2,
          stage: 'Offer',
          responsibility: 'waiting-on-me',
          daysOpen: 39,
          risk: 'low',
        },
        {
          id: 'r2',
          role: 'Product Designer',
          candidates: 12,
          stage: 'Final Round',
          responsibility: 'waiting-on-me',
          daysOpen: 45,
          risk: 'medium',
        },
        {
          id: 'r3',
          role: 'Marketing Manager',
          candidates: 74,
          stage: 'Interview',
          responsibility: 'waiting-on-recruiter',
          daysOpen: 38,
          risk: 'high',
        },
        {
          id: 'r4',
          role: 'Backend Engineer',
          candidates: 2,
          stage: 'Offer',
          responsibility: 'waiting-on-me',
          daysOpen: 42,
          risk: 'medium',
        },
        {
          id: 'r5',
          role: 'Data Analyst',
          candidates: 70,
          stage: 'Interview',
          responsibility: 'waiting-on-recruiter',
          daysOpen: 37,
          risk: 'medium',
        },
      ],
      moreCount: 2,
    },
    candidates: [
      {
        id: 'c-amelia-stone',
        name: 'Amelia Stone',
        roleTitle: 'Senior Frontend Engineer',
        roleSpecs:
          'Frontend engineer in offer stage with Angular, accessibility, and team leadership experience.',
      },
      {
        id: 'c-jonah-price',
        name: 'Jonah Price',
        roleTitle: 'Product Designer',
        roleSpecs:
          'Product designer with research synthesis, interaction design, and stakeholder facilitation experience.',
      },
      {
        id: 'c-marcus-green',
        name: 'Marcus Green',
        roleTitle: 'Backend Engineer',
        roleSpecs:
          'Backend engineer with distributed systems, API design, and cloud deployment experience.',
      },
    ],
    schedule: [
      { id: 'i-0622-1', timeLabel: '10:00 AM', group: 'today', candidateId: 'c-amelia-stone' },
      { id: 'i-0622-2', timeLabel: '1:00 PM', group: 'today', candidateId: 'c-jonah-price' },
      { id: 'i-0622-3', timeLabel: '3:30 PM', group: 'tomorrow', candidateId: 'c-marcus-green' },
    ],
    bottlenecks: [
      { responsibility: 'waiting-on-me', candidateCount: 3, avgMetric: 5.1 },
      { responsibility: 'waiting-on-recruiter', candidateCount: 5, avgMetric: 3.8 },
      { responsibility: 'candidates-aging', candidateCount: 7, avgMetric: 15.9 },
    ],
    funnelStages: funnelStages(ACTIVE_FUNNEL_BY_WEEK['2026-06-22']),
  }),

  '2026-06-29': week('2026-06-29', {
    kpis: [
      { value: 8, delta: '4 this month', trend: 'up' },
      { value: 31, valueUnit: 'days', delta: '8 days', trend: 'down' },
      { value: 94, valueUnit: '%', delta: '5% acceptance', trend: 'up' },
      { value: 6, delta: '3 active offers', trend: 'up' },
    ],
    openRequisitions: {
      items: [
        {
          id: 'r1',
          role: 'Senior Frontend Engineer',
          candidates: 1,
          stage: 'Offer',
          responsibility: 'waiting-on-me',
          daysOpen: 46,
          risk: 'low',
        },
        {
          id: 'r2',
          role: 'Product Designer',
          candidates: 2,
          stage: 'Offer',
          responsibility: 'waiting-on-me',
          daysOpen: 52,
          risk: 'medium',
        },
        {
          id: 'r3',
          role: 'Marketing Manager',
          candidates: 12,
          stage: 'Final Round',
          responsibility: 'waiting-on-me',
          daysOpen: 45,
          risk: 'high',
        },
        {
          id: 'r4',
          role: 'Backend Engineer',
          candidates: 11,
          stage: 'Final Round',
          responsibility: 'waiting-on-me',
          daysOpen: 49,
          risk: 'low',
        },
        {
          id: 'r5',
          role: 'Data Analyst',
          candidates: 64,
          stage: 'Interview',
          responsibility: 'waiting-on-recruiter',
          daysOpen: 44,
          risk: 'medium',
        },
      ],
      moreCount: 3,
    },
    candidates: [
      {
        id: 'c-talia-brooks',
        name: 'Talia Brooks',
        roleTitle: 'Marketing Manager',
        roleSpecs:
          'Marketing manager with B2B campaign strategy, launch planning, and pipeline reporting experience.',
      },
      {
        id: 'c-ethan-ross',
        name: 'Ethan Ross',
        roleTitle: 'Backend Engineer',
        roleSpecs: 'Backend engineer with API, data modeling, and platform reliability experience.',
      },
      {
        id: 'c-maya-singh',
        name: 'Maya Singh',
        roleTitle: 'Data Analyst',
        roleSpecs:
          'Analyst who translates hiring and business data into dashboards and recommendations. SQL, spreadsheet modeling, and clear stakeholder communication required.',
      },
    ],
    schedule: [
      { id: 'i-0629-1', timeLabel: '9:00 AM', group: 'today', candidateId: 'c-talia-brooks' },
      { id: 'i-0629-2', timeLabel: '11:30 AM', group: 'today', candidateId: 'c-ethan-ross' },
      { id: 'i-0629-3', timeLabel: '2:00 PM', group: 'tomorrow', candidateId: 'c-maya-singh' },
    ],
    bottlenecks: [
      { responsibility: 'waiting-on-me', candidateCount: 2, avgMetric: 4.3 },
      { responsibility: 'waiting-on-recruiter', candidateCount: 4, avgMetric: 3.2 },
      { responsibility: 'candidates-aging', candidateCount: 5, avgMetric: 14.7 },
    ],
    funnelStages: funnelStages(ACTIVE_FUNNEL_BY_WEEK['2026-06-29']),
  }),
};
