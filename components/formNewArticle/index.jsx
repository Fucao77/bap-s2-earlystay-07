import React, { useState, useRef, useEffect } from 'react';
import InputText from '../inputText';
import axios from 'axios';

import ValidateMessage from '../validateMessage';

//style
import { inputText } from './form.module.scss';
import { borderLessInput } from './form.module.scss';
import { submitButton } from './form.module.scss';
import { formArticle } from './form.module.scss';
import { inputFile } from './form.module.scss';
import { inputFileLabel } from './form.module.scss';
import { ErrorMessage } from '../errorMessage';

export default function Form() {
  const [title, setTitle] = useState('Entrez votre titre ici');
  const [description, setDescription] = useState('Entrez votre description');
  const [content, setContent] = useState('Entrez votre contenu');
  const [validateMessage, setValidateMessage] = useState('');
  const [errors, setErrors] = useState({});

  const miniature = 'test.png';
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

  const onSubmit = (e) => {
    e.preventDefault();

    axios
      .post('/api/addArticle', {
        title,
        description,
        content,
        miniature,
      })

      .then((res) => res.json())

      .then((res) => {
        console.log({ res });
        setValidateMessage('Article envoyé');
      })

      .catch((e) => {
        console.log(e.response.data);
        setErrors(e.response.data);
      });
  };

  return (
    <div>
      <form className={formArticle} onSubmit={onSubmit}>
        <InputText
          value={title}
          setValue={setTitle}
          name={'title'}
          classType={borderLessInput}
        ></InputText>

        {errors.title && <ErrorMessage>{errors.title}</ErrorMessage>}

        <input
          className={inputFile}
          type="file"
          name="miniature"
          id="miniature"
        />
        <label className={inputFileLabel} htmlFor="miniature">
          Ajouter une miniature
        </label>

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
