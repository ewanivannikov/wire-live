import styles from './style.module.css';
const {elevationSunken} = styles;
export const Card = (props) => {
  const {children, classList} = props
  return (
    <div classList={{[elevationSunken]: true, ...classList}}>
      {children}
    </div>
  );
}
