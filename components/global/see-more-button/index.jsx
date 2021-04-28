import { container, label } from './see-more.module.scss';
import classNames from 'classnames';
import GoButton from '../go-button';

export default function SeeMoreButton({ className, to }) {
  return (
    <div className={classNames(container, className)}>
      <label className={label}>Voir plus</label>
      <GoButton theme="white" dir={-1} to={to} />
    </div>
  );
}
