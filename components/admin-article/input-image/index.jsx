import React, { useEffect, useState, useRef } from 'react';
import { inputFile, inputFileLabel, contentInput } from './image.module.scss';

export default function inputImage({ name, setValue }) {
  const [img, setImg] = useState();
  const [preview, setPreview] = useState();
  const fileInputRef = useRef();

  useEffect(() => {
    if (img) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(img);
    } else {
      setPreview(null);
    }
  }, [img]);

  return (
    <div className={contentInput}>
      <br />

      <input
        className={inputFile}
        onInput={(e) => setValue(e.target.files[0])}
        type="file"
        id="miniature"
        name={name}
        accept="image/*"
        ref={fileInputRef}
        onChange={(event) => {
          const file = event.target.files[0];
          if (file && file.type.substr(0, 5) === 'image') {
            setImg(file);
          } else {
            setImg(null);
          }
        }}
      />

      {preview ? (
        <img
          src={preview}
          alt=""
          srcSet=""
          onClick={() => {
            fileInputRef.current.click();
          }}
        />
      ) : (
        <>
          <label className={inputFileLabel} htmlFor="miniature">
            Ajouter une miniature
          </label>
        </>
      )}
    </div>
  );
}
