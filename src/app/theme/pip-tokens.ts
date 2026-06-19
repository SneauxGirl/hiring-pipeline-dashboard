/**
 * Pip design tokens — single source of truth.
 * Lara surfaces/text/primary are overridden in pip-preset.ts.
 */

/** Fill + ink pairs keyed by color name. */
export const PIP_PALETTE = {
  teal: { fill: '#e7f2f1', ink: '#008782' },
  purple: { fill: '#f0ebf6', ink: '#6b229c' },
  orange: { fill: '#f6f4e6', ink: '#cf4a10' },
  gold: { fill: '#f9f2e2', ink: '#cb911a' },
  pink: { fill: '#FFF2F7', ink: '#E00048' },
  charcoal: { fill: '#e5e7eb', ink: '#4b5563' },
  blue: { fill: '#e8eef9', ink: '#143a91' },
  green: { fill: '#d8edda', ink: '#5a9e6f' },
} as const;

export type PipColor = keyof typeof PIP_PALETTE;

/**
 * Who owns the delay — shared by requisition stage pills and bottleneck cards.
 */
export type PipResponsibility =
  | 'waiting-on-me'
  | 'waiting-on-recruiter'
  | 'candidates-aging';

export const PIP_TOKENS = {
  surface: {
    page: '#FeFdFc',
    card: '#ffffff',
    border: '#e8e8e7',
    hover: '#eef1f5',
  },
  /**
   * Text tiers — keys match PrimeNG `text.*` slots and tailwindcss-primeui utilities.
   * Lara default: surface.700 / .800 / .500 / .600 (slate steps, not % black).
   * Pip uses slate (blue-tinted gray), not neutral gray — lighter steps read cooler.
   */
  text: {
    color: '#1C1C1E', // slate-700 → text-color
    hoverColor: '#242227', // slate-800 → text-color-emphasis
    mutedColor: '#6f6c7c', // slate-500 → text-muted-color
    hoverMutedColor: '#2B292E', // slate-600 → text-muted-color-emphasis (KPI numbers)
  },
  shadow: {
    card: '0 1px 3px color-mix(in srgb,rgb(42, 56, 78) 55%, transparent)',
    popover: '0 1px 4px color-mix(in srgb, #334155 8%, transparent)',
    select: '0 2px 10px color-mix(in srgb, #334155 9%, transparent)',
    modal: '0 2px 6px color-mix(in srgb, #334155 22%, transparent)',
    navigation: '0 2px 10px color-mix(in srgb, #334155 9%, transparent)',
  },
  primary: PIP_PALETTE.teal.ink,
  nav: 'purple' satisfies PipColor,
  responsibility: {
    'waiting-on-me': 'teal',
    'waiting-on-recruiter': 'purple',
    'candidates-aging': 'orange',
  } satisfies Record<PipResponsibility, PipColor>,
  risk: {
    low: 'teal',
    medium: 'orange',
    high: 'pink',
  } satisfies Record<'low' | 'medium' | 'high', PipColor>,
  schedule: {
    today: 'teal',
    tomorrow: 'purple',
    'this-week': 'purple',
  } satisfies Record<'today' | 'tomorrow' | 'this-week', PipColor>,
  trends: {
    attrition: 'pink',
    promotions: 'gold',
    transfers: 'teal',
    backfills: 'blue',
  } satisfies Record<'attrition' | 'promotions' | 'transfers' | 'backfills', PipColor>,
  /** Stage index → palette color (h1 applicants bar → h6 hired). */
  funnel: {
    bar: ['blue', 'purple', 'orange', 'gold', 'pink', 'charcoal'],
    duration: ['blue', 'purple', 'orange', 'gold', 'pink', 'charcoal'],
  } satisfies { bar: readonly PipColor[]; duration: readonly PipColor[] },
} as const;

export type PipRiskLevel = 'low' | 'medium' | 'high';

export type PipTrendMetricId = keyof typeof PIP_TOKENS.trends;

/** @deprecated Use PipResponsibility */
export type PipBottleneckTheme = PipResponsibility;
