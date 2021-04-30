import React from 'react';
import { create } from '../button-article/button.module.scss';

export default function Button() {
  return (
    <div className={create}>
      <a href="#">Crée un article</a>
    </div>
  );
}
