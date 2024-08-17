import { createSignal } from "solid-js";
import styles from './style.module.css';
const { ripple } = styles;

export const useRipple = () => {
  const [position, setPosition] = createSignal({ x: 0, y: 0 });
  const [tick, setTick] = createSignal(0);
  const onClick = (e) => {
    e.target.classList.add(ripple);

    setPosition({ x: e.offsetX, y: e.offsetY })
    const start = performance.now();
    requestAnimationFrame(function raf(now) {
      const count = Math.floor(now - start);
      setTick(count);
      if (count > 1000) {
        e.target.classList.remove(ripple);
        setTick(0);
        return;
      }
      requestAnimationFrame(raf);
    })
  }


  return {
    onClick,
    position,
    tick
  }
}
