import { Component, Input } from '@angular/core';
import { Card } from 'primeng/card';

import { OpenRequisition, OpenRequisitionsData } from '../../models/dashboard.models';

type BadgeTone = 'alexandrite' | 'magical' | 'orange' | 'hot-red';

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
        return 'alexandrite';
      case 'Interview':
        return 'magical';
      default:
        return 'orange';
    }
  }

  riskTone(risk: OpenRequisition['risk']): BadgeTone {
    switch (risk) {
      case 'low':
        return 'alexandrite';
      case 'medium':
        return 'orange';
      case 'high':
        return 'hot-red';
    }
  }

  riskLabel(risk: OpenRequisition['risk']): string {
    return risk.charAt(0).toUpperCase() + risk.slice(1);
  }

  badgeBackground(tone: BadgeTone): string {
    return `color-mix(in oklch, var(--${tone}) 16%, white)`;
  }

  badgeColor(tone: BadgeTone): string {
    return `var(--${tone})`;
  }
}
