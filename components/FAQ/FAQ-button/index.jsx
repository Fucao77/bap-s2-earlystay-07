import React, { useState } from 'react';
import { buttonfaq, text, container, svg } from './faq.module.scss';

export default function FAQ({ title, children }) {
  const [isToggle, setToggle] = useState(false);
  const [rotation, setRotation] = useState({ transform: 'rotate(0deg)' });

  function changeRotation() {
    if (!isToggle) {
      setRotation({ transform: 'rotate(90deg)' });
    } else {
      setRotation({ transform: 'rotate(0deg)' });
    }
  }

  const toggle = () => {
    setToggle((prevState) => !prevState);
    changeRotation();
  };

  return (
    <div>
      <div className={container}>
        <div className={buttonfaq} onClick={toggle}>
          <h2>
            {title}
            <svg
              className={svg}
              style={rotation}
              width="14"
              height="16"
              viewBox="0 0 14 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14 8L0.500002 15.7942L0.500002 0.205772L14 8Z"
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
