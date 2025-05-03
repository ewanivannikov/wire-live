import { LayoutHome } from '../../modules/layout/LayoutHome';
import styles from '../../modules/layout/layoutHome.module.css';
import cardStyles from '../../shared/ui/components/CardSquare/cardSquare.module.css';
import homeStyles from './home.module.css'
import { CardSquare } from '../../shared/ui/components/CardSquare/CardSquare';
import triangleSierpinski from '../../assets/triangle-sierpinski.png';

const { fat, thin } = styles
const { sizeXl, sizeL } = cardStyles
const { title, mL24Xs, justifyContentCenter, textAlignCenter } = homeStyles

export const Home = () => {
  return (
    <LayoutHome>
      <h1 classList={{[title]: true, [textAlignCenter]: true}}>Wirelive</h1>
      <CardSquare
        title="Список уровней"
        to={`/levels`}
        classList={{[fat]:true, [sizeXl]: true}}
        imageSrc={triangleSierpinski}
      />
      <CardSquare
        title="Песочницы"
        to={`/sandboxes`}
        classList={{[thin]:true, [sizeL]: true}}
        imageSrc={triangleSierpinski}
      >
        Полная свобода создания схем!
      </CardSquare>
      <CardSquare
        title="О проекте"
        to={`/about`}
        classList={{[thin]:true, [sizeL]: true, [justifyContentCenter]: true}}
      />
    </LayoutHome>
  );
};
