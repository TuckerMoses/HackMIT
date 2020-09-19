import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';

import { MdHelpOutline, MdLockOpen, MdShare } from 'react-icons/md';
import { BsSearch } from 'react-icons/bs';
import { RiFolderAddLine } from 'react-icons/ri';

const ContentContainer = styled.div`
  padding-top: 4%;
  width: 100%;
  min-height: max(100vh, 100%);
  padding-right: 5rem;
  border-left: 2px solid rgba(72, 72, 72, 0.2);
  background-color: rgba(102, 51, 0, 0.08);
  position: relative;
`;

const FlexContainer = styled.div`
  display: flex;
`;

const AvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const AvatarImgContainer = styled.div`
  height: 150px;
  width: 150px;
`;

const AvatarImg = styled.img`
  width: 100%;
  object-fit: cover;
  height: auto;
  border-radius: 50%;
`;

const AvatarName = styled.div`
  max-width: 200px;
  text-align: center;
  font-size: 2em;
  font-weight: 400;
`;

const OptionsContainer = styled.div`
  position: absolute;
  top: 5%;
  right: 8rem;
  display: flex;
  justify-content: space-between;
  width: 150px;
  height: auto;
  border: 2px solid rgba(72, 72, 72, 0.2);
  padding: 5px;
  border-radius: 10px;
`;

const ToolbarContainer = styled.div`
  margin: 2rem 0 0 2rem;
  display: flex;
  justify-content: space-between;
  width: 120px;
  height: auto;
  border: 2px solid #2c3e50;
  padding: 10px;
  border-radius: 10px;
  background-color: white;
  align-items: center;
  text-align: center;
`;

const Bookshelf = styled.div`
  margin: 20px 2rem 0 2rem;
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  overflow: auto;
  padding-bottom: 5rem;
`;

const ShelfItemContainer = styled.div`
  width: 240px;
  height: 210px;
  background-color: rgba(102, 51, 0, 0.2);
  border-radius: 20px;
  margin: 0 10px 20px 10px;
`;

const User = () => {
  let history = useHistory();

  return (
    <FlexContainer>
      <Sidebar />
      <ContentContainer>
        <OptionsContainer>
          <MdLockOpen size={25} />
          <MdShare size={25} />
          <MdHelpOutline size={25} />
        </OptionsContainer>
        <AvatarContainer>
          <AvatarImgContainer>
            <AvatarImg src="/images/elon.jpg" />
          </AvatarImgContainer>
          <AvatarName>Elon Musk</AvatarName>
          <button
            className="button is-primary is-light is-outlined"
            onClick={() => console.log('hi')}
          >
            <span className="icon">
              <i className="fas fa-plus-square"></i>
            </span>
            <span>New annotation</span>
          </button>
        </AvatarContainer>
        <ToolbarContainer>
          <RiFolderAddLine size={25} />
          <BsSearch size={25} />
        </ToolbarContainer>
        <Bookshelf>
          <ShelfItemContainer />
          <ShelfItemContainer />
          <ShelfItemContainer />
          <ShelfItemContainer />
          <ShelfItemContainer />
          <ShelfItemContainer />
        </Bookshelf>
      </ContentContainer>
    </FlexContainer>
  );
};

export default Profile;
