import {
  afterNextRender,
  Component,
  DestroyRef,
  inject,
  Injector,
  signal,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-back-to-top',
  templateUrl: './back-to-top.component.html',
})
export class BackToTopComponent {
  private static readonly SHOW_AFTER_PX = 320;

  protected readonly visible = signal(false);

  private readonly destroyRef = inject(DestroyRef);
  private readonly document = inject(DOCUMENT);
  private readonly injector = inject(Injector);

  readonly buttonClass =
    'inline-flex size-[length:var(--dashboard-control-height)] cursor-pointer items-center justify-center rounded-border border border-surface bg-surface-0 text-color shadow-[var(--p-overlay-popover-shadow,0_1px_4px_rgb(0_0_0_/_12%))] hover:bg-[color:var(--pip-nav-hover-bg)] hover:text-[color:var(--pip-nav-hover-ink)] active:bg-[color:var(--pip-nav-active-bg)] active:text-[color:var(--pip-nav-active-ink)] focus:outline-none focus-visible:bg-[color:var(--pip-nav-active-bg)] focus-visible:text-[color:var(--pip-nav-active-ink)] focus-visible:shadow-[inset_0_0_0_2px_var(--pip-nav-active-ink)]';

  constructor() {
    afterNextRender(
      () => {
        this.syncVisibility();
        const onScroll = () => this.syncVisibility();
        this.document.defaultView?.addEventListener('scroll', onScroll, { passive: true });
        this.destroyRef.onDestroy(() =>
          this.document.defaultView?.removeEventListener('scroll', onScroll),
        );
      },
      { injector: this.injector },
    );
  }

  scrollToTop(): void {
    this.document.defaultView?.scrollTo({ top: 0, behavior: 'smooth' });
  }

  private syncVisibility(): void {
    const scrollTop =
      this.document.defaultView?.scrollY ??
      this.document.documentElement.scrollTop ??
      this.document.body.scrollTop ??
      0;
    this.visible.set(scrollTop > BackToTopComponent.SHOW_AFTER_PX);
  }
}
