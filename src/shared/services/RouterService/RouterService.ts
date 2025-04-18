import {
  createHashHistory,
  createRouter,
  matchPath as matchPathRemix,
  matchRoutes,
  Router,
} from '@remix-run/router';
import { makeAutoObservable, runInAction } from 'mobx';
import { logger } from '../LoggerService';

export const router = createRouter({
  basename:
    window?.__ENV__?.RELEASE_STAGE === 'production' ? '/' : '/',
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
        {
          path: 'editor',
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
  public searchParams: URLSearchParams;
  constructor(private readonly router: Router) {
    makeAutoObservable(this);
    this.location = router.state.location;
    this.params = this.getParams();

    this.matches = router.state.matches;
    this.basename = router.basename;
  }

  public matchPath = matchPathRemix;

  private log = () => {
    logger.debug(`RouterService: params: ${JSON.stringify(this.params)}`);
    logger.debug(`RouterService: location: ${JSON.stringify(this.location)}`);
  };

  private getParams() {
    const matches = matchRoutes(this.router.routes, this.router.state.location);
    return matches[0].params;
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
        this.searchParams = new URLSearchParams(
          this.router.state.location.search,
        );
        this.location = this.router.state.location;
      });
      this.log();
    });
    this.log();
  };

  public createHref = (to: URL) => {
    return this.router.createHref(to);
  };

  public onNavigate = (handler: (e: Event) => void) => {
    window.addEventListener('navigate', handler);
  };

  public navigate = (to: string) => {
    this.router.navigate(to);
  };
}

export const routerService = new RouterService(router);
