import { Card } from './Card';
import { Typography } from '../Typography';
import styles from './style.module.css';
import cover from '../../../../assets/cover.png';
import { Send } from 'lucide-solid';
const { masonry, section, tall, big } = styles;

export const Section = () => {
  return (
    <>
    <section class={masonry}>
      <div class={section} style={{ height: '350px' }}>
        <Typography>{'Wire\nlive'}</Typography>
        <p>Изучение основ цифровой электроники в игровой форме</p>
      </div>
      <div classList={{ [big]: true, [tall]: true }} style={{ margin: '8px' }}>
        <img src={cover} style={"width: 100%; height: 100%; object-fit: cover; object-position: 50% 0;"} />
      </div>
      <Card classList={{ [tall]: true }}>
        <h1>Программа позволяет:</h1>
      </Card>
      <Card>
        <p>
          • симулировать работу с двоичной логикой. Каждая стрелка иммет
          собственную функциональность.
        </p>
      </Card>
      <Card>
        <p>
          • создавать цифовые устройства, которые являются базой для разработки
          функциональных узлов цифровой техники
        </p>
      </Card>
    </section>
    <section><p><a href="https://t.me/wirelive"><Send /> Телеграм-канал разработки</a></p></section>
    </>
  );
};
