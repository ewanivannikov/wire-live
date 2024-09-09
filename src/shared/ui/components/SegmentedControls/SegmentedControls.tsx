import styles from './segmentedControls.module.css';
const {root} = styles;
export const SegmentedControls = (props) => {
  return (
    <div
      aria-orientation="horizontal"
      {...props}
      classList={{[root]: true, ...props.classList}}
      role="group"
    />
  );
}
