var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
const putInCache = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
  const cache = yield caches.open("v1");
  yield cache.put(request, response);
});
const cacheFirst = _a => __awaiter(void 0, [_a], void 0, function* ({
  request,
  preloadResponsePromise,
  fallbackUrl
}) {
  // First try to get the resource from the cache
  const responseFromCache = yield caches.match(request);
  if (responseFromCache) {
    return responseFromCache;
  }
  // Next try to use (and cache) the preloaded response, if it's there
  const preloadResponse = yield preloadResponsePromise;
  if (preloadResponse) {
    console.info("using preload response", preloadResponse);
    putInCache(request, preloadResponse.clone());
    return preloadResponse;
  }
  // Next try to get the resource from the network
  try {
    const responseFromNetwork = yield fetch(request);
    // response may be used only once
    // we need to save clone to put one copy in cache
    // and serve second one
    putInCache(request, responseFromNetwork.clone());
    return responseFromNetwork;
  } catch (error) {
    if (fallbackUrl) {
      const fallbackResponse = yield caches.match(fallbackUrl);
      if (fallbackResponse) {
        return fallbackResponse;
      }
    }
    // when even the fallback response is not available,
    // there is nothing we can do, but we must always
    // return a Response object
    return new Response("Network error happened", {
      status: 408,
      headers: {
        "Content-Type": "text/plain"
      }
    });
  }
});
// Enable navigation preload
const enableNavigationPreload = () => __awaiter(void 0, void 0, void 0, function* () {
  if (self.registration.navigationPreload) {
    yield self.registration.navigationPreload.enable();
  }
});
self.addEventListener("activate", event => {
  event.waitUntil(enableNavigationPreload());
});
self.addEventListener("fetch", event => {
  event.respondWith(cacheFirst({
    request: event.request,
    preloadResponsePromise: event.preloadResponse
  }));
});