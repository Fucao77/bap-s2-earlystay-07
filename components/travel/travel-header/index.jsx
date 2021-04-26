import ReactHtmlParser from 'react-html-parser';

import {
  container,
  annexContainer,
  annexTitle,
  annexSubTitle,
  containerBgImg,
  travelMainImg,
  flashPointWrapper,
  flashPoint,
} from './travel-header.module.scss';
/**
 *
 * @param {
 *  title: String,
 *  description: Array<{title: String, description: String}>,
 *  imageUrl: String
 * } props
 */
export default function TravelHeader({
  title,
  accomodationName,
  description,
  imageUrl,
  duration,
  option,
}) {
  return (
    <header className={container}>
      <div className={containerBgImg}>
        <img src="/img/travel-header-img.jpg" alt="" />
      </div>
      <img src={imageUrl} alt={title} title={title} className={travelMainImg} />
      <article className={annexContainer}>
        <h1 className={annexTitle}>{title}</h1>
        <h2 className={annexSubTitle}>{accomodationName}</h2>
        <div className={flashPointWrapper}>
          {duration && (
            <div className={flashPoint}>
              <svg
                width="18"
                height="20"
                viewBox="0 0 18 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 9H4V11H6V9ZM10 9H8V11H10V9ZM14 9H12V11H14V9ZM16 2H15V0H13V2H5V0H3V2H2C0.89 2 0.00999999 2.9 0.00999999 4L0 18C0 18.5304 0.210714 19.0391 0.585786 19.4142C0.960859 19.7893 1.46957 20 2 20H16C17.1 20 18 19.1 18 18V4C18 2.9 17.1 2 16 2ZM16 18H2V7H16V18Z"
                  fill="black"
                />
              </svg>
              <p>{duration}</p>
            </div>
          )}
          {option && (
            <div className={flashPoint}>
              <svg
                width="14"
                height="18"
                viewBox="0 0 14 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13 0C13.2449 3.23106e-05 13.4813 0.0899562 13.6644 0.252715C13.8474 0.415475 13.9643 0.639749 13.993 0.883L14 1V17C13.9997 17.2549 13.9021 17.5 13.7272 17.6854C13.5522 17.8707 13.313 17.9822 13.0586 17.9972C12.8042 18.0121 12.5536 17.9293 12.3582 17.7657C12.1627 17.6021 12.0371 17.3701 12.007 17.117L12 17V12H11C10.7551 12 10.5187 11.91 10.3356 11.7473C10.1526 11.5845 10.0357 11.3603 10.007 11.117L10 11V5C10 2.79 11.5 0 13 0ZM7 0C7.24493 3.23106e-05 7.48134 0.0899562 7.66437 0.252715C7.84741 0.415475 7.96434 0.639749 7.993 0.883L8 1V6C7.99988 6.88687 7.70518 7.74858 7.16217 8.44978C6.61916 9.15098 5.85862 9.65195 5 9.874V17C4.99972 17.2549 4.90212 17.5 4.72715 17.6854C4.55218 17.8707 4.31305 17.9822 4.05861 17.9972C3.80416 18.0121 3.55362 17.9293 3.35817 17.7657C3.16271 17.6021 3.0371 17.3701 3.007 17.117L3 17V9.874C2.17545 9.66084 1.44041 9.19019 0.901764 8.53051C0.363121 7.87083 0.0489702 7.05652 0.00500011 6.206L0 6V1C0.000282707 0.74512 0.0978789 0.499968 0.272848 0.314632C0.447817 0.129296 0.686953 0.017765 0.941395 0.00282788C1.19584 -0.0121092 1.44638 0.0706746 1.64183 0.234265C1.83729 0.397855 1.9629 0.629904 1.993 0.883L2 1V6C2.00001 6.35106 2.09243 6.69594 2.26796 6.99997C2.4435 7.304 2.69597 7.55647 3 7.732V1C3.00028 0.74512 3.09788 0.499968 3.27285 0.314632C3.44782 0.129296 3.68695 0.017765 3.94139 0.00282788C4.19584 -0.0121092 4.44638 0.0706746 4.64183 0.234265C4.83729 0.397855 4.9629 0.629904 4.993 0.883L5 1L5.001 7.732C5.28006 7.57069 5.516 7.34433 5.68873 7.07218C5.86145 6.80004 5.96584 6.49018 5.993 6.169L6 6V1C6 0.734784 6.10536 0.48043 6.29289 0.292893C6.48043 0.105357 6.73478 0 7 0Z"
                  fill="black"
                />
              </svg>

              <p>{option}</p>
            </div>
          )}
        </div>

        <h2 className={annexSubTitle}>Description</h2>
        <div>{ReactHtmlParser(description)}</div>
      </article>
    </header>
  );
}
