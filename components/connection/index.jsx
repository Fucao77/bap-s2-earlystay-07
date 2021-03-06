import React, { useState } from 'react';
import {
  section,
  form,
  svg,
  input,
  titre,
  hr,
  header,
  connecter,
  card,
} from './connection.module.scss';

export default function Connection({ onConnection, csrfToken }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    onConnection({ username, password });
  };

  return (
    <section className={section}>
      <div className={card}>
        <div className={header}>
          <h1 className={titre}>Se connecter</h1>
          <div className={hr}></div>
        </div>
        <form className={form} onSubmit={onSubmit}>
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <svg
            className={svg}
            width="25"
            height="26"
            viewBox="0 0 25 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.25 6.1579C6.25 9.55295 9.05417 12.3158 12.5 12.3158C15.9458 12.3158 18.75 9.55295 18.75 6.1579C18.75 2.76284 15.9458 0 12.5 0C9.05417 0 6.25 2.76284 6.25 6.1579ZM23.6111 26H25V24.6316C25 19.3508 20.6375 15.0526 15.2778 15.0526H9.72222C4.36111 15.0526 0 19.3508 0 24.6316V26H23.6111Z"
              fill="#13275C"
            />
          </svg>
          <input
            className={input}
            name="username"
            value={username}
            onInput={(e) => setUsername(e.target.value)}
          />

          <svg
            className={svg}
            width="25"
            height="27"
            viewBox="0 0 23 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M11.5 0C10.4219 0 8.62032 0.414063 6.92501 0.875C5.19063 1.34375 3.4422 1.89844 2.41407 2.23438C1.98421 2.37633 1.60312 2.63666 1.31457 2.98547C1.02601 3.33428 0.841707 3.75741 0.782821 4.20625C-0.148429 11.2016 2.01251 16.3859 4.63438 19.8156C5.74623 21.2828 7.07193 22.5747 8.5672 23.6484C9.17032 24.075 9.7297 24.4016 10.2047 24.625C10.6422 24.8313 11.1125 25 11.5 25C11.8875 25 12.3563 24.8313 12.7953 24.625C13.368 24.3467 13.9158 24.02 14.4328 23.6484C15.9281 22.5748 17.2538 21.2828 18.3656 19.8156C20.9875 16.3859 23.1484 11.2016 22.2172 4.20625C22.1584 3.75719 21.9742 3.33381 21.6856 2.98474C21.3971 2.63566 21.0159 2.37505 20.5859 2.23281C19.0935 1.74346 17.5894 1.2902 16.075 0.873438C14.3797 0.415625 12.5781 0 11.5 0ZM11.5 7.8125C12.0535 7.81168 12.5894 8.00677 13.0129 8.36322C13.4363 8.71968 13.7199 9.21449 13.8135 9.76002C13.9071 10.3056 13.8046 10.8666 13.5241 11.3438C13.2437 11.821 12.8034 12.1835 12.2813 12.3672L12.8828 15.4766C12.9047 15.5897 12.9013 15.7062 12.8729 15.8178C12.8445 15.9294 12.7917 16.0334 12.7184 16.1222C12.6451 16.2111 12.553 16.2826 12.4488 16.3317C12.3446 16.3808 12.2308 16.4063 12.1156 16.4062H10.8844C10.7693 16.406 10.6557 16.3804 10.5517 16.3312C10.4477 16.282 10.3559 16.2105 10.2827 16.1216C10.2096 16.0328 10.1569 15.929 10.1286 15.8174C10.1003 15.7059 10.0969 15.5895 10.1188 15.4766L10.7188 12.3672C10.1966 12.1835 9.75634 11.821 9.47589 11.3438C9.19545 10.8666 9.09293 10.3056 9.1865 9.76002C9.28008 9.21449 9.5637 8.71968 9.98714 8.36322C10.4106 8.00677 10.9465 7.81168 11.5 7.8125Z"
              fill="#13275C"
            />
          </svg>
          <input
            className={input}
            type="password"
            value={password}
            onInput={(e) => setPassword(e.target.value)}
          />

          <button className={connecter}>Se connecter</button>
        </form>
      </div>
    </section>
  );
}
