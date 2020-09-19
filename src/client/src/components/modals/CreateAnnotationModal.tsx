import React, { useState } from 'react';

const CreateAnnotationModal: React.FC<any> = (props) => {
  return (
    <>
      {props.show && (
        <div className="modal is-active">
          <div className="modal-background"></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">
                Annotate an interesting link 😍
              </p>
              <button
                className="delete"
                aria-label="close"
                onClick={() => props.setShow(false)}
              ></button>
            </header>
            <section className="modal-card-body">
              <h1>Hi</h1>
            </section>
            <footer className="modal-card-foot">
              <button
                className="button is-success"
                onClick={() => console.log('Call API')}
              >
                Annotate
              </button>
              <button className="button" onClick={() => props.setShow(false)}>
                Cancel
              </button>
            </footer>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateAnnotationModal;
