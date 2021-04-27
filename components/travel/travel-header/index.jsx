import ReactHtmlParser from 'react-html-parser';

import {
  container,
  annexContainer,
  annexTitle,
  annexSubTitle,
  containerBgImg,
} from './travel-header.module.scss';
/**
 *
 * @param {
 *  title: String,
 *  description: Array<{title: String, description: String}>,
 *  imageUrl: String
 * } props
 */
export default function TravelHeader({ title, description, imageUrl }) {
  return (
    <header className={container}>
      <div className={containerBgImg}>
        <img src="/img/travel-header-img.jpg" alt="" />
      </div>
      <img src={imageUrl} alt={title} title={title} />
      <article className={annexContainer}>
        <h1 className={annexTitle}>{title}</h1>
        <h2 className={annexSubTitle}>Description</h2>
        <div>{ReactHtmlParser(description)}</div>
      </article>
    </header>
  );
}
