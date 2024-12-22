import styles from './modal.module.css';
const { footer } = styles;

export const ModalFooter = ({ children }) => <div class={footer}>{children}</div>;