import classNames from 'classnames';

import {
  goBtn,
  goBtnOrange,
  goBtnWhite,
  goBtnTop,
} from './go-button.module.scss';

const themes = {
  orange: goBtnOrange,
  white: goBtnWhite,
};

/**
 *
 * @param {
 *  to: String
 *  dir: Number,
 *  theme: String
 *  className: String
 * } props
 * @returns
 */
export default function GoButton({ to, dir, theme = 'orange', className }) {
  return (
    <a
      className={classNames(
        goBtn,
        themes[theme],
        dir > 0 ? goBtnTop : null,
        className
      )}
      href={to}
    >
      <svg
        width="16"
        height="24"
        viewBox="0 0 16 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.29289 22.78C7.68342 23.1705 8.31658 23.1705 8.7071 22.78L15.0711 16.4161C15.4616 16.0255 15.4616 15.3924 15.0711 15.0018C14.6805 14.6113 14.0474 14.6113 13.6569 15.0018L8 20.6587L2.34314 15.0018C1.95262 14.6113 1.31946 14.6113 0.928931 15.0018C0.538407 15.3924 0.538407 16.0255 0.928931 16.4161L7.29289 22.78ZM7 0.0421751L7 22.0729L9 22.0729L9 0.0421755L7 0.0421751Z"
          fill="#F79750"
        />
      </svg>
    </a>
  );
}
