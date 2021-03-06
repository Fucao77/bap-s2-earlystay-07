import {
  wrapper,
  labelWrapper,
  clock,
  pickerWrapper,
  container,
  themeBlack,
} from './date-picker.module.scss';
import DayPicker, { DateUtils, LocaleUtils } from 'react-day-picker';
import { useEffect, useRef, useState } from 'react';
import 'react-day-picker/lib/style.css';
import { dateToString } from '../../../utils/date';
import { isClicked } from '../../../utils/click-detector';
import classNames from 'classnames';

export default function DatePicker({
  label,
  selectedDate,
  setDate,
  className,
  theme = 'white',
  disabledDates,
}) {
  const [pickerEnable, setPickerEnable] = useState(false);
  const dayPickerRef = useRef(null);
  const buttonRef = useRef(null);
  const togglePicker = () => setPickerEnable((prev) => !prev);
  const onDayClick = (dateValue, config) => {
    if (config.disabled) return;
    setDate(new Date(dateValue));
  };

  useEffect(() => {
    function addBodyListener(e) {
      if (!dayPickerRef?.current) {
        return;
      }
      if (
        !isClicked(e.target, dayPickerRef.current) &&
        !isClicked(e.target, buttonRef.current)
      ) {
        setPickerEnable(false);
      }
    }

    document.body.addEventListener('click', addBodyListener);

    return () => document.body.removeEventListener('click', addBodyListener);
  }, []);

  const modifiers = {
    selectedDate,
  };

  const modifiersStyle = {
    selectedDate: {
      color: '#F79750',
      fontWeight: 'bold',
      border: '2px solid #F79750',
      borderRadius: '100%',
    },
  };

  const formatMonthTitle = (d) => {
    return (
      d.toLocaleString('default', { month: 'long' }) + ' ' + d.getFullYear()
    );
  };

  const isDayDisabled = (day) => {
    if (!disabledDates) return false;
    return !disabledDates.some((disableDay) =>
      DateUtils.isSameDay(day, disableDay)
    );
  };

  return (
    <div
      className={classNames(
        container,
        className,
        theme === 'black' ? themeBlack : null
      )}
    >
      <button className={wrapper} onClick={togglePicker} ref={buttonRef}>
        <span className={labelWrapper}>
          {selectedDate ? dateToString(selectedDate) : label}
        </span>
        <svg
          className={clock}
          width="27"
          height="25"
          viewBox="0 0 27 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0)">
            <path
              d="M13.2857 0.172424C6.19602 0.172424 0.428589 5.74098 0.428589 12.5862C0.428589 19.4315 6.19602 25 13.2857 25C20.3754 25 26.1429 19.4315 26.1429 12.5862C26.1429 5.74098 20.3754 0.172424 13.2857 0.172424ZM19.4004 19.0072C19.1915 19.2089 18.9172 19.3104 18.6429 19.3104C18.3687 19.3104 18.0942 19.2089 17.8855 19.0072L12.5283 13.8349C12.3268 13.6415 12.2144 13.3786 12.2144 13.1035V6.37932C12.2144 5.80727 12.6942 5.3449 13.2857 5.3449C13.8772 5.3449 14.3571 5.80727 14.3571 6.37932V12.6752L19.4004 17.5445C19.8193 17.9491 19.8193 18.6027 19.4004 19.0072Z"
              fill="white"
            />
          </g>
          <defs>
            <clipPath id="clip0">
              <rect
                width="25.7143"
                height="24.8276"
                fill="white"
                transform="translate(0.428589 0.172424)"
              />
            </clipPath>
          </defs>
        </svg>
      </button>
      {pickerEnable && (
        <div className={pickerWrapper} ref={dayPickerRef}>
          <DayPicker
            onDayClick={onDayClick}
            modifiers={modifiers}
            modifiersStyles={modifiersStyle}
            disabledDays={isDayDisabled}
            month={
              disabledDates ? disabledDates.sort((a, b) => a - b)[0] : null
            }
            localeUtils={{
              ...LocaleUtils,
              formatMonthTitle,
            }}
          />
        </div>
      )}
    </div>
  );
}
