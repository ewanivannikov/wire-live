import { Section } from '../shared';
import { Card } from '../shared/ui/components/Card';

export const Home = () => {
  return (
    <>
      <Card
        title="Список уровней"
        to={`/levels`}
      />
      <Card
        title="Песочницы"
        to={`/sandboxes`}
      >
        Полная свобода создания схем!
      </Card>
      <Card
        title="О проекте"
        to={`/about`}
      />
    </>
  );
};
