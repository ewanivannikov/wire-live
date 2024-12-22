import { For } from "solid-js"
import { levelRepository } from "../data"
import { Card } from "../shared/ui/components/Card"
import { Button } from "../shared/ui/components/Button"

export const LevelList = () => {
  return (
    <div>
      <For each={levelRepository.getLevelList()}>
        {(val) => (
          <Card imageSrc="https://placehold.co/300x200" title={val.name} href={`#/levels/${val.slug}`}>
            <Button>Запустить уровень</Button>
          </Card>
        )}
      </For>
    </div>
  )
}
