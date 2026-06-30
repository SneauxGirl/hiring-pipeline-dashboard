import { Component } from '@angular/core';

import { SITE_CONTACT } from '../../config/site-contact.config';

@Component({
  selector: 'app-site-footer',
  host: { class: 'block w-full min-w-0 shrink-0' },
  template: `
    <footer class="py-6" aria-label="Site footer">
      <div
        class="mx-auto flex w-full max-w-[length:var(--dashboard-max-width)] flex-wrap items-center gap-4 px-[length:var(--dashboard-margin)]"
      >
        <nav class="flex items-center gap-2" aria-label="Contact links">
          <a
            [href]="contact.linkedIn"
            [class]="linkClass"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open LinkedIn profile in a new tab"
          >
            <svg
              class="size-6 shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <rect x="3" y="3" width="18" height="18" rx="3"></rect>
              <path d="M8 10v7"></path>
              <path d="M8 7h.01"></path>
              <path d="M12 17v-4a2 2 0 014 0v4"></path>
            </svg>
          </a>
          <a
            [href]="contact.github"
            [class]="linkClass"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open GitHub profile in a new tab"
          >
            <svg
              class="size-6 shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="M9 19c-4 1.2-4-2-6-2"></path>
              <path
                d="M15 22v-3.1a3.3 3.3 0 00-.9-2.6c3 0 6-1.4 6-6.4A5 5 0 0019 6.7 4.6 4.6 0 0019 3s-1.2-.4-4 1.5a13.8 13.8 0 00-6 0C6.2 2.6 5 3 5 3a4.6 4.6 0 000 3.7A5 5 0 003 9.9c0 5 3 6.4 6 6.4a3.3 3.3 0 00-.9 2.6V22"
              ></path>
            </svg>
          </a>
          <a [href]="emailHref" [class]="linkClass" aria-label="Send email">
            <svg
              class="size-6 shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <rect x="3" y="6" width="18" height="12" rx="2"></rect>
              <path d="M3 8l9 6 9-6"></path>
            </svg>
          </a>
        </nav>

        <p class="m-0 text-base text-color">
          © {{ contact.name }} {{ year }}
        </p>
      </div>
    </footer>
  `,
})
export class SiteFooterComponent {
  readonly contact = SITE_CONTACT;
  readonly year = new Date().getFullYear();
  readonly emailHref = `mailto:${SITE_CONTACT.email}`;

  readonly linkClass =
    'inline-flex size-6 cursor-pointer items-center justify-center rounded-border border-0 bg-transparent text-muted-color no-underline hover:bg-[color:var(--pip-nav-hover-bg)] hover:text-[color:var(--pip-nav-hover-ink)] focus:outline-none focus-visible:shadow-[inset_0_0_0_2px_var(--pip-nav-active-ink)]';
}
