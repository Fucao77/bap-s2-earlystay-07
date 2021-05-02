import {
  container,
  circleButton,
  circleButtonSelected,
} from './search-page-bar.module.scss';
import classNames from 'classnames';

export default function PageBar({ values = [], onClick, currentValue }) {
  return (
    <div className={container}>
      {values.map((val, index) => (
        <button
          key={index}
          className={classNames(
            circleButton,
            currentValue === val ? circleButtonSelected : null
          )}
          onClick={() => onClick(val)}
        ></button>
      ))}
    </div>
  );
}
