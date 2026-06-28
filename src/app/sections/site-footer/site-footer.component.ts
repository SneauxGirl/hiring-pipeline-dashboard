import { Component } from '@angular/core';

import { SITE_CONTACT } from '../../config/site-contact.config';

@Component({
  selector: 'app-site-footer',
  templateUrl: './site-footer.component.html',
  host: { class: 'block w-full min-w-0 shrink-0' },
})
export class SiteFooterComponent {
  readonly contact = SITE_CONTACT;
  readonly year = new Date().getFullYear();
}
