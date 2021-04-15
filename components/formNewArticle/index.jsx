import React, { useState, useRef, useEffect } from 'react';
import InputText from '../inputText';
//import parse from 'html-react-parser'

// import validateMessage from '../validateMessage';

//style
import { inputText } from './form.module.scss';
import { borderLessInput } from './form.module.scss';
import { submitButton } from './form.module.scss';
import { formArticle } from './form.module.scss';
import { inputFile } from './form.module.scss';
import { inputFileLabel } from './form.module.scss';

export default function Form() {
  let send = false;

  const [title, setTitle] = useState('Entrez votre titre ici');
  const [description, setDescription] = useState('Entrez votre description');
  const [content, setContent] = useState('Entrez votre contenu');

  const miniature = 'test';
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

    fetch('../../api/addArticle', {
      method: 'POST',
      body: JSON.stringify({ title, description, content, miniature }),
    })
      .then((res) => {
        console.log(res);
        send = true;
      })

      .catch((e) => {
        console.log(e);
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

        <input className={inputFile} type="file" name="miniature" />
        <label className={inputFileLabel} htmlFor="miniature">
          Ajouter une miniature
        </label>

        <InputText
          value={description}
          setValue={setDescription}
          name={'description'}
          classType={inputText}
        ></InputText>

        {editorLoaded && (
          <CKEditor
            editor={ClassicEditor}
            data={content}
            onChange={(event, editor) => {
              setContent(editor.getData());
            }}
            type="classic"
            style={{
              witdh: '70vw',
              border: '5px solid red',
            }}
          />
        )}

        {send ? (
          <validateMessage>Article envoyé</validateMessage>
        ) : (
          <button type="submit" className={submitButton}>
            Ajouter
          </button>
        )}
      </form>
    </div>
  );
}
