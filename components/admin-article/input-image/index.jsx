import React, { useEffect, useState, useRef } from 'react';
import { inputFile, inputFileLabel, contentInput } from './image.module.scss';

export default function InputImage({ name, setValue, miniature }) {
  const [img, setImg] = useState();
  const miniaturePath = '/upload-image/article-image/' + miniature;

  const [preview, setPreview] = useState(miniature ? miniaturePath : null);
  const fileInputRef = useRef();

  useEffect(() => {
    if (img) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(img);
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
          alt="image-article"
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
