import { PIP_PALETTE, PIP_TOKENS, pipLightPageGradient } from './pip-tokens';

/** Nav chrome — derived from PIP_TOKENS.nav palette entry. */
export function pipNavCssVars(): Record<string, string> {
  const nav = PIP_PALETTE[PIP_TOKENS.nav];
  return {
    '--pip-nav-active-bg': nav.fill,
    '--pip-nav-active-ink': nav.solid,
    '--pip-nav-hover-bg': `color-mix(in srgb, ${nav.fill} 55%, white)`,
    '--pip-nav-hover-ink': nav.solid,
  };
}

/** Theme-level CSS vars — light defaults; dark/session override in a later pass. */
export function pipThemeCssVars(): Record<string, string> {
  return {
    ...pipNavCssVars(),
    '--dashboard-page-bg': pipLightPageGradient(),
  };
}

export function applyPipCssVars(root: HTMLElement): void {
  for (const [name, value] of Object.entries(pipThemeCssVars())) {
    root.style.setProperty(name, value);
  }
}
