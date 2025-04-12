import styles from './progressBar.module.css';

export type ProgressBarProps = {
  classList?: Record<string, boolean>;
  value: number;
}

export const ProgressBar = (props: ProgressBarProps) => {
  return (
    <progress 
      value={props.value}
      max="100"
      classList={{ 
        [styles.bar]: true, 
        ...props.classList
      }}
    />
  );
};
