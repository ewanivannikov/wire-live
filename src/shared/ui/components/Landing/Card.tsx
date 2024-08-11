import { elevationSunken } from './style.module.css';
export const Card = (props) => {
  const {children, classList} = props
  return (
    <div classList={{[elevationSunken]: true, ...classList}}>
      {children}
    </div>
  );
}
