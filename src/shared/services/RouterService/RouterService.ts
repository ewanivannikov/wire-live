import { createHashHistory, createRouter, matchRoutes, Router } from '@remix-run/router';
import { makeAutoObservable, observable, runInAction } from 'mobx';

export const router = createRouter({
  basename:
    window?.__ENV__?.RELEASE_STAGE === 'production' ? '/wire-live/' : '/',
  routes: [
    {
      path: '/',
      children: [
        {
          path: 'home',
        },
        {
          path: 'about',
        },
        {
          path: 'levels/',
          children: [{ path: ':levelId' }],
        },
      ],
    },
  ],
  history: createHashHistory(),
}).initialize();
export class RouterService {
  public location;
  public params;
  public matches;
  public basename;
  constructor(private readonly router: Router) {
    makeAutoObservable(this);
    this.location = router.state.location;
    this.params = router.state.matches[0].params;

    this.matches = router.state.matches;
    this.basename = router.basename;
  }

  private getParams() {
    return router.state.matches?.[0].params;
  }

  public init = () => {
    /** отслеживать изменения в url в SPA без react
     * {@link https://stackoverflow.com/questions/6390341/how-to-detect-if-url-has-changed-after-hash-in-javascript/52809105#52809105}
     */
    const oldPushState = window.history.pushState;
    window.history.pushState = function pushState(...args) {
      const result = oldPushState.apply(this, args);
      window.dispatchEvent(new Event('pushstate'));
      window.dispatchEvent(new Event('navigate'));

      return result;
    };

    const oldReplaceState = window.history.replaceState;
    window.history.replaceState = function replaceState(...args) {
      const result = oldReplaceState.apply(this, args);
      window.dispatchEvent(new Event('replacestate'));
      window.dispatchEvent(new Event('navigate'));

      return result;
    };

    window.addEventListener('popstate', () => {
      window.dispatchEvent(new Event('navigate'));
    });

    window.addEventListener('navigate', () => {
      runInAction(() => {
        this.params = this.getParams();
        this.searchParams = new URLSearchParams(window.location.search);
        this.location = window.location;
      });
    });
  };

  public onNavigate = (handler: (e: Event) => void) => {
    window.addEventListener('navigate', handler);
  };
}

export const routerService = new RouterService(router);
