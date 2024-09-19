import { createIsMounted } from "@solid-primitives/lifecycle";
import { createMemo } from "solid-js";
import { createWorld } from "../modules/mapContainer";

export const Canvas = () => {
  let ref: HTMLDivElement;
  const isMounted = createIsMounted();
  createMemo(() => {
    if (isMounted()) {
      const world = createWorld(ref);
      world.render();
    }
  });
  return (
    <div id="canvas" ref={ref} />
  );
};
