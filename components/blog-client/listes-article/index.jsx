import React from 'react';
import {
  article,
  photo,
  texte,
  icone,
  time,
  date,
  footer,
} from '../listes-article/listearticle.module.scss';

export default function ListArticle() {
  return (
    <section className={article}>
      <div className={photo}>
        <img
          src="https://images.unsplash.com/photo-1508162252424-e8ad5ef02539?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
          alt=""
        />
      </div>

      <div className={texte}>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem quas
          ducimus iste rem, consequuntur iure dignissimos accusamus eos harum
          similique saepe corrupti accusantium iusto nesciunt ullam facere
          aliquam provident sed!
        </p>
      </div>

      <div className={icone}>
        <div className={time}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.25 2C6.736 2 2.25 6.486 2.25 12C2.25 17.514 6.736 22 12.25 22C17.764 22 22.25 17.514 22.25 12C22.25 6.486 17.764 2 12.25 2ZM18 13H11.25V6H13.25V11H18V13Z"
              fill="black"
            />
          </svg>
          <p>3 mins</p>
        </div>

        <div className={date}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 11H7V13H9V11ZM13 11H11V13H13V11ZM17 11H15V13H17V11ZM19 4H18V2H16V4H8V2H6V4H5C3.89 4 3.01 4.9 3.01 6L3 20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H19C20.1 22 21 21.1 21 20V6C21 4.9 20.1 4 19 4ZM19 20H5V9H19V20Z"
              fill="black"
            />
          </svg>
          <p>25 mars 2021</p>
        </div>
      </div>

      <div className={footer}>
        <a href="#">Voir plus</a>
      </div>
    </section>
  );
}
