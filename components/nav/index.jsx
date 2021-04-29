import React, { useState } from 'react';
import Link from 'next/link';
import {
  nav,
  links,
  link,
  logo,
  destination,
  navRight,
  svg,
  croix,
  container,
  containerLinks,
} from './nav.module.scss';

export default function Nav() {
  const [isToggle, setToggle] = useState(false);
  const [display1, setMenu] = useState({ display: 'block' });
  const [display2, setMenu2] = useState({ display: 'none' });

  function changeMenu() {
    if (!isToggle) {
      setMenu({ display: 'none' });
      setMenu2({ display: 'block' });
    } else {
      setMenu({ display: 'block' });
      setMenu2({ display: 'none' });
    }
  }

  const toggle = () => {
    setToggle((prevState) => !prevState);
    changeMenu();
  };

  return (
    <div className={container}>
      <nav className={nav}>
        <div className={logo}>
          <p>Logo</p>
        </div>
        <div className={navRight}>
          <button className={destination}>Destination</button>
          <svg
            className={svg}
            onClick={toggle}
            style={display1}
            width="27"
            height="21"
            viewBox="0 0 27 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              x1="1.5"
              y1="1.5"
              x2="24.75"
              y2="1.5"
              stroke="#13275C"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <line
              x1="1.5"
              y1="10.5"
              x2="24.75"
              y2="10.5"
              stroke="#13275C"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <line
              x1="1.5"
              y1="19.5"
              x2="24.75"
              y2="19.5"
              stroke="#13275C"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <svg
            onClick={toggle}
            style={display2}
            className={(croix, svg)}
            width="22"
            height="21"
            viewBox="0 0 22 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              x1="3"
              y1="18.1593"
              x2="19.4402"
              y2="1.71909"
              stroke="#13275C"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <line
              x1="2.96556"
              y1="1.71924"
              x2="19.4058"
              y2="18.1595"
              stroke="#13275C"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </nav>
      <div className={containerLinks}>
        <div className={links} style={display2}>
          <Link href="/connexion/connexion">
            <a className={link}>connexion</a>
          </Link>
          <Link href="/">
            <a className={link}>Accueil</a>
          </Link>
          <Link href="/destination/destination.js">
            <a className={link}>Destination</a>
          </Link>
          <Link href="/QSN/index.js">
            <a className={link}>Qui sommes-nous?</a>
          </Link>
          <Link href="/FAQ">
            <a className={link}>FAQ</a>
          </Link>
        </div>
      </div>
    </div>
  );
}
