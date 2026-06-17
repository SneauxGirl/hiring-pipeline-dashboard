import { Component, Input } from '@angular/core';
import { Card } from 'primeng/card';

import { OpenRequisition, OpenRequisitionsData } from '../../models/dashboard.models';
import { ThemePalette, themePaletteTint, themePaletteVar } from '../../theme/theme-colors';

type BadgeTone = 'success' | 'info' | 'warn' | 'danger';

const BADGE_PALETTE: Record<BadgeTone, ThemePalette> = {
  success: 'teal',
  info: 'primary',
  warn: 'amber',
  danger: 'red',
};

@Component({
  selector: 'app-requisitions',
  imports: [Card],
  templateUrl: './requisitions.component.html',
})
export class RequisitionsComponent {
  @Input({ required: true }) requisitions!: OpenRequisitionsData;

  stageTone(stage: string): BadgeTone {
    switch (stage) {
      case 'Final Round':
        return 'success';
      case 'Interview':
        return 'info';
      default:
        return 'warn';
    }
  }

  riskTone(risk: OpenRequisition['risk']): BadgeTone {
    switch (risk) {
      case 'low':
        return 'success';
      case 'medium':
        return 'warn';
      case 'high':
        return 'danger';
    }
  }

  riskLabel(risk: OpenRequisition['risk']): string {
    return risk.charAt(0).toUpperCase() + risk.slice(1);
  }

  badgeBackground(tone: BadgeTone): string {
    return themePaletteTint(BADGE_PALETTE[tone], 600);
  }

  badgeColor(tone: BadgeTone): string {
    return themePaletteVar(BADGE_PALETTE[tone], 700);
  }
}
