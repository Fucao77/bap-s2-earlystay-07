import React from 'react';
import {
  liner,
  contenu,
  header_contenu,
  texte,
} from '../notre-histoire/histoire.module.scss';

export default function Histoire() {
  return (
    <div className={contenu}>
      <div className={header_contenu}>
        <h2>Notre Histoire</h2>
        <div className={liner}></div>
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
