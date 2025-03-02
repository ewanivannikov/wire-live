import styles from './histogram.module.css';
import { For } from 'solid-js';

export type HistogramProps = {
  status: "resolved" | 'pending'; 
  bars: {
    amount: number;
    barColor: string;
  }[];
  classList: { [k: string]: boolean; };
}

export const Histogram = (props: HistogramProps) => {
  return (
    <div classList={props.classList}>
      <For each={props.bars}>
        {(bar) => (
          <div>
            <div
              style={{
                width: `${bar.amount}%`,
                'background-color': props.status === 'pending' ? '#ddd' :bar.barColor,
              }}
              classList={{ 
                [styles.bar]: true, 
                [styles.pending]: props.status === 'pending' 
              }}
            />
          </div>
        )}
      </For>
    </div>
  );
};
