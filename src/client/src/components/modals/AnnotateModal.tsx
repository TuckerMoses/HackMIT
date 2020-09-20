import React, { useState } from 'react';
import styled from 'styled-components';
import { Field, FieldAttributes, Form, Formik } from 'formik';
import { fetchMe } from '../../api/userApi';
import { createLibrary } from '../../api/libraryApi';
import auth from '../../api/auth';
import Annotate from './Annotate';

const AnnotateModal: React.FC<any> = (props) => {
  console.log(props.content);
  return (
    <>
      {props.show && (
        <div className="modal is-active">
          <div className="modal-background"></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Share your thoughts 💡</p>
              <button
                className="delete"
                aria-label="close"
                onClick={() => props.setShow(false)}
              ></button>
            </header>
            <section className="modal-card-body">
              <Annotate content={props.content} />
            </section>
            <footer className="modal-card-foot">
              <button
                className="button is-primary is-light is-outlined"
                onClick={() => props.setShow(false)}
              >
                Save
              </button>
            </footer>
          </div>
        </div>
      )}
    </>
  );
};

export default AnnotateModal;
