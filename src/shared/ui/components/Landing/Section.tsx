import { Card } from './Card';
import { Typography } from '../Typography';
import { section, masonry, big, tall } from './style.module.css';

export const Section = (props) => {
  return (
    <section class={masonry}>
      <div class={section} style={{"height": '300px'}}>
        <Typography>{'Wire\nlive'}</Typography>
      </div>
      <div 
        classList={{ [big]: true }} 
      >
        <image src="https://fakeimg.pl/600x400" />
      </div>
      <Card 
        classList={{[tall]: true}} 
        style={{"margin": '8px'}}
      >
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
}

