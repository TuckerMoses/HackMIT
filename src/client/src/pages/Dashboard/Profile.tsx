import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';

const ContentContainer = styled.div`
  text-align: center;
  margin: 5% 0;
`;

const FlexContainer = styled.div`
  display: flex;
`;

const Profile = () => {
  let history = useHistory();

  return (
    <FlexContainer>
      <Sidebar />
      <ContentContainer>
        <h1>Profile Page</h1>
        <button
          className="button is-primary"
          onClick={() => history.push('/dashboard')}
        >
          Dashboard
        </button>
      </ContentContainer>
    </FlexContainer>
  );
};

export default Profile;
