import { Card } from './Card';
import { Typography } from '../Typography';
import styles from './style.module.css';
import { Button } from '../Button';
const { masonry, section, tall, big } = styles;

export const Section = () => {
  return (
    <section class={masonry}>
      <div class={section} style={{ height: '300px' }}>
        <Typography>{'Wire\nlive'}</Typography>
        <p>Изучение основ цифровой электроники в игровой форме</p>
      </div>
      <div classList={{ [big]: true }}>
        <Button component="a" href="/auth/google">Войти</Button>
      </div>
      <Card classList={{ [tall]: true }} style={{ margin: '8px' }}>
        <p>Уровни</p>
      </Card>
      <div class={section}>
        <p>Редактор</p>
      </div>
      <div class={section}>
        <p>Песочница</p>
      </div>
    </section>
  );
};
