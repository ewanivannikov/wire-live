import styles from './histogram.module.css';
import { For } from 'solid-js';

export const Histogram = (props) => {
  return (
    <div classList={props.classList}>
      <For each={props.bars}>
        {(bar) => (
          <div>
            <div
              style={{
                width: `${bar.amount}%`,
                'background-color': bar.barColor,
              }}
              classList={{ [styles.bar]: true }}
            />
          </div>
        )}
      </For>
    </div>
  );
};
