import React from 'react';
import { inputFile, inputFileLabel, contentInput } from './image.module.scss';

export default function inputImage({ name, setValue }) {
  return (
    <div className={contentInput}>
      <br />
      <input
        className={inputFile}
        onInput={(e) => setValue(e.target.files[0])}
        type="file"
        id="miniature"
        name={name}
      />

      <label className={inputFileLabel} htmlFor="miniature">
        Ajouter une miniature
      </label>
    </div>
  );
}
