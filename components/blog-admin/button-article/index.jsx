import React from 'react';
import { create } from '../button-article/button.module.scss';

export default function Button({ href = '#' }) {
  return (
    <div className={create}>
      <a href={href}>Crée un article</a>
    </div>
  );
}
