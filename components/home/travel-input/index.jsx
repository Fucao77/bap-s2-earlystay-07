import { container, input, confirm } from './travel-input.module.scss';

export default function TravelInput({
  placeholder,
  value,
  setValue,
  onSubmit,
}) {
  const onInput = (e) => {
    setValue(e.target.value);
  };

  const onLocalSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form className={container} onSubmit={onLocalSubmit}>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onInput={onInput}
        className={input}
      />
      <button className={confirm} onClick={onSubmit}>
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M31.6898 1.34142C31.5282 1.11261 31.3138 0.931726 31.0715 0.819855C30.8291 0.707985 30.569 0.66973 30.3212 0.709549L0.577535 5.56192L0.0949531 8.16094L10.6477 16.5721L15.7869 30.7445L18.2623 31.5238L31.8572 2.89319C31.9679 2.65852 32.011 2.38806 31.9813 2.11333C31.9517 1.8386 31.8506 1.5709 31.6898 1.34142ZM17.1943 28.5637L12.7769 16.3817L24.5613 8.27012L23.2984 6.31326L11.4219 14.488L2.72108 7.55294L29.2236 3.22897L17.1943 28.5637Z"
            fill="white"
          />
        </svg>
      </button>
    </form>
  );
}
