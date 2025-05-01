import styles from "./layoutHome.module.css";

const { container, carcass } = styles

export function LayoutHome(props) {
  return (
    <div class={container}>
      <div class={carcass}> 
        {props.children}
      </div>
    </div>
  )
}
