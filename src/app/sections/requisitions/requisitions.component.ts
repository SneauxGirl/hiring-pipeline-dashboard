import { Component, Input } from '@angular/core';
import { Card } from 'primeng/card';

import { OpenRequisition, OpenRequisitionsData } from '../../models/dashboard.models';
import { PipResponsibility, PipRiskLevel } from '../../theme/pip-tokens';
import { paletteSolid, responsibilityPill } from '../../theme/theme-colors';

@Component({
  selector: 'app-requisitions',
  imports: [Card],
  templateUrl: './requisitions.component.html',
})
export class RequisitionsComponent {
  @Input({ required: true }) requisitions!: OpenRequisitionsData;

  stageStyle(responsibility: PipResponsibility): { bg: string; text: string } {
    return responsibilityPill(responsibility);
  }

  riskLabel(risk: OpenRequisition['risk']): string {
    return risk.charAt(0).toUpperCase() + risk.slice(1);
  }

  riskInk(level: PipRiskLevel): string | undefined {
    return level === 'high' ? paletteSolid('red') : undefined;
  }
}
