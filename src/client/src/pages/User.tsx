import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const ContentContainer = styled.div`
  margin: 5% 0;
  width: 100%;
  margin-right: 5rem;
`;

const FlexContainer = styled.div`
  display: flex;
`;

const AvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AvatarImg = styled.img`
  max-width: 200px;
  height: auto;
  border-radius: 50px;
`;

const AvatarName = styled.div`
  max-width: 200px;
  text-align: center;
  font-size: 2em;
  font-weight: 400;
`;

const Bookshelf = styled.div`
  width: 100%;
  height: 100%;
  border: 3px solid rgb(102, 51, 0);
  background-color: rgba(102, 51, 0, 0.1);
  display: flex;
  justify-content: space-between;
`;

const User = () => {
  let history = useHistory();

  return (
    <FlexContainer>
      <Sidebar />
      <ContentContainer>
        <AvatarContainer>
          <AvatarImg src="/images/elon.jpg" />
          <AvatarName>Elon Musk</AvatarName>
        </AvatarContainer>
        <Bookshelf /> {/* Books go in here */}
      </ContentContainer>
    </FlexContainer>
  );
};

export default User;
