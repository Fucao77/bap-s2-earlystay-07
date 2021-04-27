import React, { useState } from 'react';
import { buttonfaq, text, container, svg } from './faq.module.scss';

export default function FAQ({ title, children }) {
  const [isToggle, setToggle] = useState(false);

  const toggle = () => {
    setToggle((prevState) => !prevState);
  };

  return (
    <div>
      <div className={container}>
        <div className={buttonfaq} onClick={toggle}>
          <h2>
            {title}
            <svg
              className={svg}
              width="16"
              height="14"
              viewBox="0 0 16 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 14L0.20577 0.5L15.7942 0.500002L8 14Z"
                fill="#3668A4"
              />
            </svg>
          </h2>
        </div>
        <div className={text}>{!isToggle ? '' : children}</div>
      </div>
    </div>
  );
}
