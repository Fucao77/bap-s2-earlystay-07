import { actionButton } from './action-button.module.scss';

export default function ActionButton({ children }) {
  return <button className={actionButton}>{children}</button>;
}
