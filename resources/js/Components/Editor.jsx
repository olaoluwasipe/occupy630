// src/EditorComponent.jsx
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const EditorComponent = ({ onTextChange, value }) => {

  return (
    <div className="editor-container">
      <ReactQuill value={value} onChange={onTextChange} />
    </div>
  );
};

export default EditorComponent;
