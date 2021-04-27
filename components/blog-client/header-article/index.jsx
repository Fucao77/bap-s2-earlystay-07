import React from 'react';
import {
  article_header,
  image,
  contenu,
  texte,
  footer_article,
} from '../header-article/headerclient.module.scss';

export default function HeaderArticle() {
  return (
    <div className={article_header}>
      <div className={image}>
        <img
          src="https://images.unsplash.com/photo-1515896769750-31548aa180ed?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1434&q=80"
          alt=""
        />
      </div>

      <div className={contenu}>
        <h2>Titre</h2>

        <div className={texte}>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. <br />{' '}
            Dolores tenetur neque labore nobis officiis dolore quia earum non
            porro consequatur necessitatibus,
            <br /> quae libero debitis rerum cupiditate velit harum! Quia,
            doloremque! Lorem ipsum dolor sit amet consectetur, adipisicing
            elit. <br /> Dolores tenetur neque labore nobis officiis dolore quia
            earum non porro consequatur necessitatibus,
            <br /> quae libero debitis rerum cupiditate velit harum! Quia,
            doloremque!
          </p>
        </div>

        <div className={footer_article}>
          <p>25 mars 2021 </p>
          <a href="#">Voir plus</a>
        </div>
      </div>
    </div>
  );
}
