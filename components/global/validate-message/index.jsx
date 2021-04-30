import React from 'react';

import { validateMessage } from './valideMessage.module.scss';

export default function ValidateMessage({ children }) {
  return (
    <div>
      <p className={validateMessage}>{children}</p>
    </div>
  );
}
