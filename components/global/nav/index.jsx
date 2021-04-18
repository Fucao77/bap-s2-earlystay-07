import React from 'react';
import Link from 'next/link';
import { nav } from './nav.module.scss';

export default function Nav() {
  return (
    <nav className={nav}>
      <Link href="/connexion/connexion.js">
        <a>connexion</a>
      </Link>
      <Link href="/">
        <a>Accueil</a>
      </Link>
      <Link href="/destination/destination.js">
        <a>Destination</a>
      </Link>
      <Link href="/QSN/index.js">
        <a>Qui sommes-nous?</a>
      </Link>
      <Link href="/faq/index.js">
        <a>FAQ</a>
      </Link>
    </nav>
  );
}
