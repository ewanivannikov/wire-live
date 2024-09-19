import { createIsMounted } from "@solid-primitives/lifecycle";
import { createMemo } from "solid-js";
import { createWorld } from "../modules/mapContainer";
import { routerService } from "../shared/services";

export const Canvas = () => {
  let ref: HTMLDivElement;
  const isMounted = createIsMounted();
  createMemo(() => {
    if (isMounted()) {
      const mapId = routerService.location.hash
      const regex = /#\/levels\//;
      const newStr = mapId.replace(regex, "");
      const world = createWorld(ref, newStr);
      world.render();
    }
  });
  return (
    <div id="canvas" ref={ref} />
  );
};
