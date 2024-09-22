import { For } from "solid-js"
import { levelRepository } from "../data"

export const LevelList = () => {
  return (
    <div>
      <For each={levelRepository.getLevelList()}>
        {(val) => (
          <div><a href={`/#/levels/${val.slug}`}>{val.name}</a></div>
        )}
      </For>
    </div>
  )
}
