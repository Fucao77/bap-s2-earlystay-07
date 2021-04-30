import React from 'react';
import Footer from '../global/footer';
import Nav from '../global/nav';
import { section, block } from '../qui-sommes-nous/propos.module.scss';
import Ambition from './ambition';
import Histoire from './notre-histoire';

export default function Propos() {
  return (
    <section className={section}>
      <Nav />

      <header>
        <h1>Qui sommes-nous ?</h1>
        <div className={block}></div>
      </header>

      <Histoire />

      <Ambition />

      <Footer />
    </section>
  );
}
