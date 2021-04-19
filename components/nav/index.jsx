import React from 'react';
import Link from 'next/link';
import { nav, links, link, logo } from './nav.module.scss';

export default function Nav() {
  return (
    <nav className={nav}>
      <div className={logo}>
        <p>Logo</p>
      </div>
      <div className={links}>
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
        <Link href="/faq/index.js">
          <a className={link}>FAQ</a>
        </Link>
      </div>
    </nav>
  );
}
