import { subTitle } from './sub-title.module.scss';

export default function SubTitle({ title }) {
  return <h2 className={subTitle}>{title}</h2>;
}
