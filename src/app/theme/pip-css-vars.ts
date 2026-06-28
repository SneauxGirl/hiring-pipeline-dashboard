import { PIP_PALETTE, PIP_TOKENS } from './pip-tokens';

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

export function applyPipCssVars(root: HTMLElement): void {
  for (const [name, value] of Object.entries(pipNavCssVars())) {
    root.style.setProperty(name, value);
  }
}
