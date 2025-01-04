import { createWorldState } from "./viewModel";
import { WorldStateContext } from "./WorldStateContext";

export const WorldStateProvider = (props) => {
  return (
    <WorldStateContext.Provider value={createWorldState()}>
      {props.children}
    </WorldStateContext.Provider>
  );
};
