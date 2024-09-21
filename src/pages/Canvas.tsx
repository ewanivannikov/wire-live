import { createIsMounted } from "@solid-primitives/lifecycle";
import { createMemo } from "solid-js";
import { createWorld } from "../modules/mapContainer";
import { routerService } from "../shared/services";
import { createWorldState } from "../modules/worldState/viewModel";

export const Canvas = () => {
  let ref: HTMLDivElement;
  const isMounted = createIsMounted();
  createMemo(() => {
    if (isMounted()) {
      const mapId = routerService.location.hash
      const regex = /#\/levels\//;
      const levelId = mapId.replace(regex, "");
      createWorldState(levelId);
      const world = createWorld(ref, levelId);
      world.render();
    }
  });
  return (
    <div id="canvas" ref={ref} />
  );
};
