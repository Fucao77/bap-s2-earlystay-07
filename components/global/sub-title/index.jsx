import { subTitle, colorWhite, colorOrange } from './sub-title.module.scss';
import classNames from 'classnames';

const colors = {
  orange: colorOrange,
  white: colorWhite,
};

export default function SubTitle({ title, color = 'orange' }) {
  return <h2 className={classNames(subTitle, colors[color])}>{title}</h2>;
}
