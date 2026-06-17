import { Component, Input } from '@angular/core';
import { Card } from 'primeng/card';

import { BottleneckCard, BottleneckTheme } from '../../models/dashboard.models';
import { themePaletteTint, themePaletteVar } from '../../theme/theme-colors';

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
      case 'teal':
        return { iconClass: 'pi pi-clock' };
      case 'primary':
        return { iconClass: 'pi pi-user' };
      case 'amber':
        return { iconClass: 'pi pi-calendar' };
      default:
        return { iconClass: 'pi pi-info-circle' };
    }
  }

  colorVar(theme: BottleneckTheme): string {
    return themePaletteVar(theme, 600);
  }

  iconBg(theme: BottleneckTheme): string {
    return themePaletteTint(theme, 600);
  }
}
