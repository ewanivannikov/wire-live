import { For } from 'solid-js';
import { Card } from '../../shared/ui/components/Card';
import { LinkRouter } from '../../shared/ui/components/LinkRouter';
import { ContentStatus } from '../../shared';
import { createSandboxList } from './presenter';

export const SandboxList = () => {
  const sandboxList = createSandboxList();

  return (
    <ContentStatus
      status={sandboxList.state.status}
      error={sandboxList.state.error}
    >
      <div class="sandbox-list-grid">
        {/* <Card
          // imageSrc={covers[val.slug] || coverPlaceholder}
          title={"Создать песочницу"}
          to={`/sandboxes/${val.slug}`}
        >
          <Button component={LinkRouter} to={`/sandboxes/${val.slug}`}>
            Создать песочницу
          </Button>
        </Card> */}
        <For each={sandboxList.list}>
          {(val) => (
            <Card
              // imageSrc={covers[val.slug] || coverPlaceholder}
              title={val.name}
              to={`/sandboxes/${val.slug}`}
            />
          )}
        </For>
      </div>
    </ContentStatus>
    
  );
};
