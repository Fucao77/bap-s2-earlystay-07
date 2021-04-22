import { container, circleButton } from './search-page-bar.module.scss';

export default function SearchPageBar({ values, onClick }) {
  return (
    <div className={container}>
      {values.map((val, index) => (
        <button
          key={index}
          className={circleButton}
          onClick={() => onClick(val)}
        ></button>
      ))}
    </div>
  );
}
