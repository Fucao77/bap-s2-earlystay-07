import { errorMessage } from './errorMessage.module.scss';

export function ErrorMessage({ children }) {
  return <p className={errorMessage}>{children}</p>;
}
