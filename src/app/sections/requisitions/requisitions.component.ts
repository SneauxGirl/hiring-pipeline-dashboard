import { Component, Input } from '@angular/core';
import { Card } from 'primeng/card';

import { OpenRequisition, OpenRequisitionsData } from '../../models/dashboard.models';
import { PipColor, PipRiskLevel } from '../../theme/pip-tokens';
import { paletteFill, paletteInk, paletteSolid } from '../../theme/theme-colors';

const STAGE_PILL_COLORS: Record<string, PipColor> = {
  Screening: 'purple',
  Assessment: 'orange',
  Interview: 'purple',
  'Final Round': 'teal',
  Offer: 'pink',
};

@Component({
  selector: 'app-requisitions',
  imports: [Card],
  templateUrl: './requisitions.component.html',
})
export class RequisitionsComponent {
  @Input({ required: true }) requisitions!: OpenRequisitionsData;

  stageStyle(stage: string): { bg: string; text: string } {
    const color = STAGE_PILL_COLORS[stage] ?? 'charcoal';
    return { bg: paletteFill(color), text: paletteInk(color) };
  }

  riskLabel(risk: OpenRequisition['risk']): string {
    return risk.charAt(0).toUpperCase() + risk.slice(1);
  }

  riskInk(level: PipRiskLevel): string | undefined {
    return level === 'high' ? paletteSolid('red') : undefined;
  }
}
