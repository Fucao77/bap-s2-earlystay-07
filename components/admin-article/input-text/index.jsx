import React from 'react';

export default function Inputs({ name, classType, value, setValue, children }) {
  return (
    <div>
      <label htmlFor={name}>
        {children}
        <input
          onInput={(e) => setValue(e.target.value)}
          name={name}
          className={classType}
          type="text"
          value={value}
        />
      </label>
    </div>
  );
}
