/**
 * Pip design tokens — single source of truth.
 * Lara surfaces/text/primary are overridden in pip-preset.ts.
 */

/** Fill + solid + ink triples keyed by color name. Charts use solid; pills/labels use fill + ink. */
export const PIP_PALETTE = {
  teal: { fill: '#e7f2f1', solid: '#008782', ink: '#008782' },
  purple: { fill: '#f0ebf6', solid: '#6b229c', ink: '#6b229c' },
  orange: { fill: '#FFF1EB', solid: '#F85330', ink: '#C94327' },
  gold: { fill: '#FFFAE2', solid: '#e5b82e', ink: '#A95E00' },
  pink: { fill: '#FFF0F6', solid: '#D0356D', ink: '#7A1D42' },
  red: { fill: '#fce8ec', solid: '#DC143C', ink: '#9B1B30' },
  charcoal: { fill: '#F1F0F2', solid: '#B0ACB4', ink: '#251827' },
  blue: { fill: '#E6EDF3', solid: '#004887', ink: '#004887' },
  green: { fill: '#EAF8EB', solid: '#4CC851', ink: '#3C8735' },
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
  /** Main content `.dashboard-page` radial — applied via `--dashboard-page-bg` in pip-css-vars.ts */
  pageGradient: {
    center: '#ffffff',
    mid: '#fffdf8',
    edge: '#f8f5f2',
  },
  primary: PIP_PALETTE.purple.solid,
  nav: 'purple' satisfies PipColor,
  responsibility: {
    'waiting-on-me': 'teal',
    'waiting-on-recruiter': 'purple',
    'candidates-aging': 'orange',
  } satisfies Record<PipResponsibility, PipColor>,
  risk: {
    low: 'teal',
    medium: 'gold',
    high: 'red',
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
  /** Stage index → palette color (h1 applicants → h6 hired). Aligns with responsibility hues from h3 onward. */
  funnel: {
    bar: ['blue', 'purple', 'orange', 'teal', 'pink', 'gold'],
    duration: ['blue', 'purple', 'orange', 'teal', 'pink', 'gold'],
  } satisfies { bar: readonly PipColor[]; duration: readonly PipColor[] },
} as const;

export type PipRiskLevel = 'low' | 'medium' | 'high';

export type PipTrendMetricId = keyof typeof PIP_TOKENS.trends;

/**
 * Dark scheme tokens — framed for `prefers-color-scheme: dark` (not wired yet).
 * Accent palette (`PIP_PALETTE`) stays shared with light; only surfaces, text, page gradient, shadows differ.
 *
 * Remapping intent (from light):
 * - Former `text.color` (#1C1C1E) → page gradient center / lightest stop (not necessarily body text).
 * - Former `text.hoverColor` (#242227) → card surface.
 * - Former `text.mutedColor` / `hoverMutedColor` → dark text tiers (likely need re-tuning; fills may suit pills only).
 */
export const PIP_DARK_TOKENS = {
  surface: {
    /** p-card, sidebar, header chrome — former light `text.hoverColor` */
    card: '#242227',
    /** PrimeNG surface.50 — sits under `.dashboard-page` gradient; TODO: edge stop or transparent */
    page: '#121214',
    /** borders on cards/controls — TODO: define (light `#e8e8e7` fails on dark) */
    border: '#3A3840',
    /** row/cell hover — TODO: define */
    hover: '#2E2C32',
  },
  text: {
    /** Primary body — TODO: define readable on `#242227` (≠ gradient center `#1C1C1E`) */
    color: '#E8E8EA',
    /** Emphasis / hover — TODO: define */
    hoverColor: '#FFFFFF',
    /** Former light muted — verify contrast on card + gradient */
    mutedColor: '#6f6c7c',
    /** Secondary emphasis — TODO: define (former light `#2B292E` is too dark here) */
    hoverMutedColor: '#9896A4',
  },
  /** Main content `.dashboard-page` radial — same hook as light; active when dark mode is wired */
  pageGradient: {
    /** Lightest stop — former light `text.color` */
    center: '#1C1C1E',
    /** TODO: define mid stop */
    mid: '#161618',
    /** TODO: define darkest edge */
    edge: '#0D0D0F',
  },
  shadow: {
    /** TODO: re-tune for dark surfaces (light scheme mixes `#334155` / blue-gray) */
    card: '0 1px 3px color-mix(in srgb, rgb(0, 0, 0) 45%, transparent)',
    popover: '0 1px 4px color-mix(in srgb, #000000 24%, transparent)',
    select: '0 2px 10px color-mix(in srgb, #000000 28%, transparent)',
    modal: '0 2px 6px color-mix(in srgb, #000000 40%, transparent)',
    navigation: '0 2px 10px color-mix(in srgb, #000000 28%, transparent)',
  },
} as const;

type PipPageGradientStops = { center: string; mid: string; edge: string };

/** Shared radial shape for light and dark `.dashboard-page` backgrounds. */
export function pipPageGradient(stops: PipPageGradientStops): string {
  const { center, mid, edge } = stops;
  return `radial-gradient(ellipse 180% 140% at 50% -30%, ${center} 0%, ${mid} 40%, ${edge} 100%)`;
}

export function pipLightPageGradient(): string {
  return pipPageGradient(PIP_TOKENS.pageGradient);
}

export function pipDarkPageGradient(): string {
  return pipPageGradient(PIP_DARK_TOKENS.pageGradient);
}

/**
 * Dark mode — known holes (no wiring this pass).
 *
 * Activation (deferred):
 * - `app.config.ts` → `darkModeSelector: 'prefers-color-scheme: dark'` (later: class + session override)
 * - Session toggle defaults light; user choice locks for session — needs service + `html` class, not OS pref alone
 *
 * Tokens still to define / verify:
 * - `surface.page`, `surface.border`, `surface.hover`
 * - `text.color`, `text.hoverColor`, `text.hoverMutedColor` (contrast on `#242227`)
 * - `pageGradient.mid`, `pageGradient.edge`
 * - All `shadow.*` strengths on `#242227` cards
 *
 * Hardcoded light leaks (fix when dark goes live):
 * - `pip-css-vars.ts` — swap `--dashboard-page-bg` to `pipDarkPageGradient()` under dark / session class
 * - `styles.css` `html/body` `background: var(--p-surface-0)` — confirm sidebar vs main
 * - `bottleneck.component.html` — `bg-white` inner cards → `bg-surface-0`
 * - `pip-css-vars.ts` — nav hover `color-mix(..., white)` → mix against surface/card
 * - `bottleneck.component.ts` — icon bg `color-mix(..., white)` → same
 * - `trends.component.ts` — chart `pointBorderColor: '#fff'` → theme var
 *
 * Preset / component gaps:
 * - `components.card.root.shadow` is global today — dark may need per-scheme override in preset
 * - `applyPipCssVars()` — no dark branch; nav hover mixes assume light
 * - `PIP_PALETTE` fills unchanged — pills OK; verify `riskPill` charcoal ink on dark cards
 * - `theme-colors.ts` `blendHex(..., '#000000')` funnel drops — spot-check on dark
 */
