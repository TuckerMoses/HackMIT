import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';

const ContentContainer = styled.div`
  margin: 5% 0;
`;

const FlexContainer = styled.div`
  display: flex;
`;

const ConnectBot = () => {
  let history = useHistory();

  return (
    <FlexContainer>
      <Sidebar />
      <ContentContainer>
        <h3 className="title is-3">Meet Someone New</h3>
        <button
          className="button is-primary is-light is-outlined"
          onClick={() => history.push('/dashboard')}
        >
          Dashboard
        </button>
      </ContentContainer>
    </FlexContainer>
  );
};

export default ConnectBot;
