/** Lara / PrimeNG primitive palettes available as CSS variables. */
export type ThemePalette = 'primary' | 'teal' | 'blue' | 'amber' | 'orange' | 'red' | 'purple';

export type ThemePaletteShade = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950;

export function themePaletteVar(
  palette: ThemePalette,
  shade: ThemePaletteShade = 600,
): string {
  if (palette === 'primary' && shade === 500) {
    return 'var(--p-primary-color)';
  }

  if (palette === 'primary') {
    return `var(--p-primary-${shade})`;
  }

  return `var(--p-${palette}-${shade})`;
}

export function themePaletteTint(
  palette: ThemePalette,
  shade: ThemePaletteShade = 600,
  colorPercent = 16,
): string {
  return `color-mix(in srgb, ${themePaletteVar(palette, shade)} ${colorPercent}%, white)`;
}

export function themeTextColor(): string {
  return 'var(--p-text-color)';
}

export function themeMutedColor(): string {
  return 'var(--p-text-muted-color)';
}

export function themeBorderColor(): string {
  return 'var(--p-content-border-color)';
}

export function readThemeVar(token: string): string {
  if (typeof document === 'undefined') {
    return '';
  }

  const name = token.startsWith('--') ? token : `--p-${token}`;
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

export function readPaletteColor(
  palette: ThemePalette,
  shade: ThemePaletteShade = 600,
): string {
  if (palette === 'primary' && shade === 500) {
    return readThemeVar('primary-color');
  }

  if (palette === 'primary') {
    return readThemeVar(`primary-${shade}`);
  }

  return readThemeVar(`${palette}-${shade}`);
}
