import React from 'react';
import {
  liner,
  contenu,
  header_contenu,
  blockimage,
  image,
  texte,
} from './ambition.module.scss';

export default function Ambition() {
  return (
    <div className={contenu}>
      <div className={header_contenu}>
        <h2>Notre Amibition</h2>
        <div className={liner}></div>
      </div>

      <div className={blockimage}>
        <img
          src="https://cdn.pixabay.com/photo/2016/08/16/17/32/hollywood-sign-1598473_960_720.jpg"
          alt=""
          className={image}
        />
        <img
          src="https://cdn.pixabay.com/photo/2018/12/27/13/24/griffith-observatory-3897616_960_720.jpg"
          alt=""
          className={image}
        />
      </div>

      <div className={texte}>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci a
          vitae asperiores aliquid. Corrupti exercitationem unde alias
          voluptatem voluptates dicta accusantium voluptatum ullam architecto,
          laborum non temporibus cum dignissimos debitis! Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Adipisci a vitae asperiores
          aliquid. Corrupti exercitationem unde alias voluptatem voluptates
          dicta accusantium voluptatum ullam architecto, laborum non temporibus
          cum dignissimos debitis! Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Adipisci a vitae asperiores aliquid. Corrupti
          exercitationem unde alias voluptatem voluptates dicta accusantium
          voluptatum ullam architecto, laborum non temporibus cum dignissimos
          debitis!Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Adipisci a vitae asperiores aliquid. Corrupti exercitationem unde
          alias voluptatem voluptates dicta accusantium voluptatum ullam
          architecto, laborum non temporibus cum dignissimos debitis!Lorem ipsum
          dolor sit amet consectetur adipisicing elit. Adipisci a vitae
          asperiores aliquid. Corrupti exercitationem unde alias voluptatem
          voluptates dicta accusantium voluptatum ullam architecto, laborum non
          temporibus cum dignissimos debitis!Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Adipisci a vitae asperiores aliquid.
          Corrupti exercitationem unde alias voluptatem voluptates dicta
          accusantium voluptatum ullam architecto, laborum non temporibus cum
          dignissimos debitis!{' '}
        </p>

        <p>
          {' '}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci a
          vitae asperiores aliquid. Corrupti exercitationem unde alias
          voluptatem voluptates dicta accusantium voluptatum ullam architecto,
          laborum non temporibus cum dignissimos debitis!Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Adipisci a vitae asperiores
          aliquid. Corrupti exercitationem unde alias voluptatem voluptates
          dicta accusantium voluptatum ullam architecto, laborum non temporibus
          cum dignissimos debitis!
        </p>
      </div>
    </div>
  );
}
