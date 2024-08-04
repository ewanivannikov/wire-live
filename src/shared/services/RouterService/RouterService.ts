import { createBrowserHistory, createRouter, Router } from "@remix-run/router";
import { observable } from "mobx";

export const router = createRouter({
  basename: window?.__ENV__?.RELEASE_STAGE === 'production'
    ? '/wire-live/'
    : '/',
  routes: [{
    path: '/',
    children: [
      {
        path: 'home',
      },
      {
        path: 'maps/',
        children: [
          { path: ':mapId' },
        ]
      },
    ]
  }],
  history: createBrowserHistory({ window, v5Compat: true }),
}).initialize();
class RouterService {
  public location
  public params
  public matches
  constructor(private readonly router: Router) {
    this.location = observable(router.state.location);
    this.params = observable(router.state.matches[0].params);
    this.matches = observable(router.state.matches);
  }
}

export const routerService = new RouterService(router);
