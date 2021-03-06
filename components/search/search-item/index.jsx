import Link from 'next/link';
import HtmlParser from 'react-html-parser';

import {
  container,
  miniature,
  main,
  mainTitle,
  mainDescription,
  mainWrapper,
  wrapper,
  ctaLink,
  annexData,
  annexDataWrapper,
} from './search-item.module.scss';

export default function SearchItem({
  imageUrl,
  title,
  description,
  linkUrl,
  price,
  dayNumber,
  withDelivery,
}) {
  return (
    <article className={container}>
      <div className={miniature}>
        <img src={imageUrl} alt={title + ' image'} />
      </div>
      <div className={mainWrapper}>
        <div className={wrapper}>
          <div className={main}>
            <h3 className={mainTitle}>{title}</h3>
            <p className={mainDescription}>
              {HtmlParser(
                description.substring(0, 150) +
                  (description.length > 150 ? '...' : '')
              )}
            </p>
          </div>
          <footer className={annexDataWrapper}>
            <div className={annexData}>
              <svg
                viewBox="0 0 67 65"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M33.6353 4.0625C17.5887 4.0625 4.57764 16.7959 4.57764 32.5C4.57764 48.2041 17.5887 60.9375 33.6353 60.9375C49.6818 60.9375 62.6929 48.2041 62.6929 32.5C62.6929 16.7959 49.6818 4.0625 33.6353 4.0625ZM33.6353 56.1133C20.3129 56.1133 9.50706 45.5381 9.50706 32.5C9.50706 19.4619 20.3129 8.88672 33.6353 8.88672C46.9577 8.88672 57.7635 19.4619 57.7635 32.5C57.7635 45.5381 46.9577 56.1133 33.6353 56.1133Z"
                  fill="white"
                />
                <path
                  d="M44.9668 40.5361L35.7176 33.9917V18.2812C35.7176 18.002 35.4841 17.7734 35.1987 17.7734H32.0789C31.7936 17.7734 31.5601 18.002 31.5601 18.2812V35.7627C31.5601 35.9277 31.6379 36.0801 31.7741 36.1753L42.5021 43.8306C42.7356 43.9956 43.0599 43.9448 43.2285 43.7227L45.0835 41.2471C45.2522 41.0122 45.2003 40.6948 44.9668 40.5361Z"
                  fill="white"
                />
              </svg>
              <p>{dayNumber}J</p>
            </div>
            <div className={annexData}>
              <svg
                viewBox="0 0 54 49"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M36.7505 42.1042C33.4607 42.1071 30.2335 41.2243 27.422 39.5524C24.6106 37.8805 22.3232 35.484 20.8103 32.625H36.7505L39.5179 27.2083H18.9839C18.8455 26.3146 18.7625 25.4208 18.7625 24.5C18.7625 23.5792 18.8455 22.6854 18.9839 21.7917H36.7505L39.5179 16.375H20.8103C22.3259 13.5182 24.6139 11.1235 27.4247 9.45196C30.2356 7.78042 33.4614 6.89625 36.7505 6.89584C41.206 6.89584 45.3018 8.49376 48.4566 11.1479L53.3549 6.35418C48.7981 2.33898 42.8821 0.119592 36.7505 0.12501C25.9023 0.12501 16.7146 6.92293 13.283 16.375H3.54181L0.774414 21.7917H12.01C11.7859 23.5906 11.7859 25.4095 12.01 27.2083H3.54181L0.774414 32.625H13.283C16.7146 42.0771 25.9023 48.875 36.7505 48.875C43.1432 48.875 48.9547 46.5188 53.3549 42.6458L48.4289 37.8521C45.3018 40.5063 41.2337 42.1042 36.7505 42.1042Z"
                  fill="white"
                />
              </svg>
              <p>{price}</p>
            </div>
            <div className={annexData}>
              <svg
                viewBox="0 0 52 51"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.5005 27.3154L0.587402 31.145L14.2832 36.8894L20.1556 50.2956L24.0687 46.466L22.1122 36.8894L31.2806 27.9167L41.2708 48.7817L44.9764 45.1552L41.6832 17.7388L49.5094 10.0769C50.038 9.57721 50.4597 8.97951 50.7497 8.31865C51.0398 7.6578 51.1925 6.94702 51.1989 6.2278C51.2053 5.50858 51.0652 4.79532 50.7869 4.12963C50.5086 3.46394 50.0977 2.85916 49.578 2.35057C49.0583 1.84199 48.4403 1.43978 47.7601 1.16743C47.0799 0.895075 46.3511 0.758023 45.6162 0.764273C44.8813 0.770523 44.155 0.919949 43.4798 1.20383C42.8045 1.48771 42.1938 1.90037 41.6832 2.41771L33.6494 10.28L5.63513 7.05438L2.13437 10.4831L23.2883 20.4227L14.286 29.2329L4.5005 27.3154Z"
                  fill="white"
                />
              </svg>
              <p>{withDelivery}</p>
            </div>
          </footer>
        </div>
        <Link href={linkUrl}>
          <a className={ctaLink}>D??couvrir</a>
        </Link>
      </div>
    </article>
  );
}
