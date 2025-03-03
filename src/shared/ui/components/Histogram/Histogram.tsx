import styles from './histogram.module.css';
import { For } from 'solid-js';

export type HistogramProps = {
  bars: {
    amount: number;
    barColor: string;
    status: "resolved" | 'pending'
  }[];
  classList: { [k: string]: boolean; };
}

export const Histogram = (props: HistogramProps) => {
  return (
    <div classList={props.classList}>
      <For each={props.bars}>
        {(bar) => (
          <div>
            <progress 
              value={bar.amount}  
              max="100"
              classList={{ 
                [styles.bar]: true, 
                [styles.pending]: bar.status === 'pending' 
              }}
              style={{"--color": bar.barColor}}
            />
            {/* <div
              style={{
                width: `${bar.amount}%`,
                'background-color': props.status === 'pending' ? '#ddd' : bar.barColor,
              }}
              classList={{ 
                [styles.bar]: true, 
                [styles.pending]: props.status === 'pending' 
              }}
            /> */}
          </div>
        )}
      </For>
    </div>
  );
};
