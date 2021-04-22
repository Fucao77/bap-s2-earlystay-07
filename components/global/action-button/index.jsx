import { actionButton } from './action-button.module.scss';

export default function ActionButton({ children, onClick }) {
  return (
    <button className={actionButton} onClick={onClick}>
      {children}
    </button>
  );
}
