import React, { useState, useRef, useEffect } from 'react';
import InputText from '../input-text';
import InputImage from '../input-image';
import { ErrorMessage } from '../../global/error-message';
import ValidateMessage from '../../global/validate-message';

import {
  inputText,
  borderLessInput,
  submitButton,
  formArticle,
} from './form.module.scss';

export default function Form({
  prevTitle,
  prevDescription,
  prevContent,
  onSubmit,
  validateMessage,
  errors,
  prevMiniature,
}) {
  const [title, setTitle] = useState(
    prevTitle ? prevTitle : 'Entrez votre titre ici'
  );
  const [description, setDescription] = useState(
    prevDescription ? prevDescription : 'Entrez votre description'
  );
  const [content, setContent] = useState(
    prevContent ? prevContent : 'Entrez votre contenu'
  );
  const [miniature, setMiniature] = useState(null);

  const editorRef = useRef();
  const [editorLoaded, setEditorLoaded] = useState(false);
  const { CKEditor, ClassicEditor } = editorRef.current || {};

  useEffect(() => {
    editorRef.current = {
      /*eslint-disable */
      CKEditor: require('@ckeditor/ckeditor5-react').CKEditor,

      ClassicEditor: require('@ckeditor/ckeditor5-build-classic'),
      /*eslint-enable */
    };
    setEditorLoaded(true);
  }, []);

  const onLocalSubmit = function (e) {
    e.preventDefault();
    onSubmit({ title, description, miniature, content });
  };

  return (
    <div>
      <form className={formArticle} onSubmit={onLocalSubmit}>
        <InputText
          value={title}
          setValue={setTitle}
          name={'title'}
          classType={borderLessInput}
        ></InputText>

        {errors.title && <ErrorMessage>{errors.title}</ErrorMessage>}

        <InputImage
          value={miniature}
          setValue={setMiniature}
          name={'miniature'}
          miniature={prevMiniature}
        ></InputImage>

        <InputText
          value={description}
          setValue={setDescription}
          name={'description'}
          classType={inputText}
        ></InputText>

        {errors.description && (
          <ErrorMessage>{errors.description}</ErrorMessage>
        )}

        {editorLoaded && (
          <div style={{ width: '70vw' }}>
            <CKEditor
              editor={ClassicEditor}
              data={content}
              onChange={(event, editor) => {
                setContent(editor.getData());
              }}
              type="classic"
              style={{
                display: 'none',
                border: '5px solid red',
              }}
            />

            {errors.content && <ErrorMessage>{errors.content}</ErrorMessage>}
          </div>
        )}

        {validateMessage && (
          <ValidateMessage>{validateMessage}</ValidateMessage>
        )}

        <button type="submit" className={submitButton}>
          Ajouter
        </button>
      </form>
    </div>
  );
}
