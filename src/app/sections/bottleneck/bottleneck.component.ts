import { Component, Input } from '@angular/core';
import { Card } from 'primeng/card';

import { BottleneckCard, BottleneckTheme } from '../../models/dashboard.models';

interface BottleneckThemeConfig {
  iconClass: string;
}

@Component({
  selector: 'app-bottleneck',
  imports: [Card],
  templateUrl: './bottleneck.component.html',
})
export class BottleneckComponent {
  @Input({ required: true }) bottlenecks: BottleneckCard[] = [];

  themeConfig(theme: BottleneckTheme): BottleneckThemeConfig {
    switch (theme) {
      case 'alexandrite':
        return { iconClass: 'pi pi-clock' };
      case 'magical':
        return { iconClass: 'pi pi-user' };
      case 'orange':
        return { iconClass: 'pi pi-calendar' };
    }
  }

  colorVar(theme: BottleneckTheme): string {
    return `var(--${theme})`;
  }

  iconBg(theme: BottleneckTheme): string {
    return `color-mix(in oklch, ${this.colorVar(theme)} 14%, white)`;
  }
}
