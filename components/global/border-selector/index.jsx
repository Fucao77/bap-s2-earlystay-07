import {
  button,
  arrow,
  container,
  containerOptions,
  option,
  arrowSelected,
  themeBlack,
  themeDisable,
} from './border-selector.module.scss';
import classNames from 'classnames';
import { useRef, useState, useEffect } from 'react';
import { isClicked } from '../../../utils/click-detector';

export default function BorderSelector({
  label,
  className,
  data,
  selected,
  setSelected,
  theme = 'white',
  isDisable = false,
}) {
  const [selectorEnable, setSelectorEnable] = useState(false);
  const toggle = () => {
    if (isDisable) return;
    setSelectorEnable((prev) => !prev);
  };
  const selectOption = (index) => {
    if (isDisable) return;
    setSelected(data[index]);
    toggle();
  };

  const selectorRef = useRef();
  const buttonRef = useRef();

  useEffect(() => {
    function addBodyListener(e) {
      if (!selectorRef?.current) {
        return;
      }
      if (
        !isClicked(e.target, selectorRef.current) &&
        !isClicked(e.target, buttonRef.current)
      ) {
        setSelectorEnable(false);
      }
    }

    document.body.addEventListener('click', addBodyListener);

    return () => document.body.removeEventListener('click', addBodyListener);
  }, []);

  return (
    <div
      className={classNames(
        className,
        container,
        theme === 'black' ? themeBlack : null,
        isDisable ? themeDisable : null
      )}
    >
      <button className={button} onClick={toggle} ref={buttonRef}>
        {selected?.label ? selected.label : label}
        <svg
          className={classNames(arrow, selectorEnable ? arrowSelected : null)}
          width="18"
          height="15"
          viewBox="0 0 18 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.7942 0.500002L9 14L1.20577 0.5L16.7942 0.500002Z"
            stroke="white"
          />
        </svg>
      </button>
      {data && selectorEnable && (
        <ul className={containerOptions} ref={selectorRef}>
          {data.map((item, index) => (
            <li
              key={index}
              className={option}
              onClick={() => selectOption(index)}
            >
              {item.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
