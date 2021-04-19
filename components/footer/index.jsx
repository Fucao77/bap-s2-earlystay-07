import React from 'react';
import Link from 'next/link';
import { content, link, footer, title } from './footer.module.scss';

export default function Footer() {
  return (
    <footer className={footer}>
      <div className={content}>
        <h3 className={title}>Nos destination</h3>
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
      <div className={content}>
        <h3 className={title}>A propos</h3>
        <Link href="/connexion/connexion">
          <a className={link}>Qui sommes-nous ?</a>
        </Link>
        <Link href="/connexion/connexion">
          <a className={link}>Plan du site</a>
        </Link>
        <Link href="/connexion/connexion">
          <a className={link}>Notre concept</a>
        </Link>
        <Link href="/connexion/connexion">
          <a className={link}>Votre Avis</a>
        </Link>
      </div>
      <div className={content}>
        <h3 className={title}>Info pratiques</h3>
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
