import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const ContentContainer = styled.div`
  text-align: center;
  margin: 10vh auto;
  width: 80vw;
`;

const ButtonGroup = styled.div`
  margin: 20px;
`;

const Button = styled.button`
  margin: 5px;
`;

const Main = () => {
  let history = useHistory();

  return (
    <ContentContainer>
      <h1 className="title is-1">Welcome to WebShelf</h1>
      <p>
        Goodreads but for the new era of digital media. Social first, as smooth
        as Twitter, and seamlessly integrated into knowledge management tools
        like Notion and Roam.
      </p>
      <a href="https://github.com/TuckerMoses/HackMIT">Check out our Github</a>
      <ButtonGroup>
        <Button
          className="button is-primary"
          onClick={() => history.push('/signup')}
        >
          Sign Up
        </Button>
        <Button
          className="button is-secondary"
          onClick={() => history.push('/login')}
        >
          Login
        </Button>
      </ButtonGroup>
    </ContentContainer>
  );
};

export default Main;
