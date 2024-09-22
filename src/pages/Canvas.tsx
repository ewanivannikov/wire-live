import { createIsMounted } from "@solid-primitives/lifecycle";
import { createMemo } from "solid-js";
import { createWorld } from "../modules/mapContainer";
import { routerService } from "../shared/services";

export const Canvas = () => {
  let ref: HTMLDivElement;
  const isMounted = createIsMounted();
  createMemo(() => {
    if (isMounted()) {
      const levelId = routerService.params.levelId;
      
      const world = createWorld(ref, levelId);
      world.render();
    }
  });
  return (
    <div id="canvas" ref={ref} />
  );
};
