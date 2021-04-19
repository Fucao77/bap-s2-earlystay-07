import React from 'react';
import Link from 'next/link';
import { footer, link } from './footer.module.scss';

export default function Footer() {
  return (
    <footer>
      <div>
        <h3>Nos destination</h3>
        <Link href="/connexion/connexion">
          <a className={link}>Egypte</a>
        </Link>
        <Link href="/connexion/connexion">
          <a className={link}>Afrique</a>
        </Link>
        <Link href="/connexion/connexion">
          <a className={link}>Amerique</a>
        </Link>
        <Link href="/connexion/connexion">
          <a className={link}>France</a>
        </Link>
      </div>
      <div>
        <h3>A propos</h3>
        <Link href="/connexion/connexion">
          <a className={link}>Qui sommes-nous ?</a>
        </Link>
        <Link href="/connexion/connexion">
          <a className={link}>Plan duu site</a>
        </Link>
        <Link href="/connexion/connexion">
          <a className={link}>Notre concept</a>
        </Link>
        <Link href="/connexion/connexion">
          <a className={link}>Votre Avis</a>
        </Link>
      </div>
      <div>
        <h3>Info pratiques</h3>
        <Link href="/connexion/connexion">
          <a className={link}>Mentions légales</a>
        </Link>
        <Link href="/connexion/connexion">
          <a className={link}>Conditions générales d'utilisation</a>
        </Link>
        <Link href="/connexion/connexion">
          <a className={link}>Cookies</a>
        </Link>
        <Link href="/connexion/connexion">
          <a className={link}>FAQ</a>
        </Link>
      </div>
    </footer>
  );
}
