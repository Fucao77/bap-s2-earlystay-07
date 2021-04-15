import React from 'react';
import {
  section,
  article,
  img,
  header,
} from '../gestion_article/article.module.scss';

export default function Gestion() {
  return (
    <section className={section}>
      <div className={article}>
        <div>
          <img
            src="https://images.unsplash.com/photo-1618271121437-c1c70b12c294?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1225&q=80"
            alt=""
            className={img}
          />
        </div>

        <div className={header}>
          <h1>Mon article de blog </h1>
          <p>25 mars 2021</p>
        </div>

        <div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod,
            fugiat ducimus? Consequuntur eligendi, nemo atque temporibus, qui
            error provident nostrum, dolor quo nulla neque illo nihil amet
            ratione at repellendus!
          </p>
        </div>
      </div>
    </section>
  );
}
