import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import CreateAnnotationModal from '../../components/modals/CreateAnnotationModal';
import CreateFolderModal from '../../components/modals/CreateFolderModal';
import AnnotateModal from '../../components/modals/AnnotateModal';
// To be implemented in the future
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import Tooltip from '@material-ui/core/Tooltip';
import {
  MdHelpOutline,
  MdLockOpen,
  MdLockOutline,
  MdPeople,
  MdShare,
  MdFolder,
  MdImportContacts,
} from 'react-icons/md';
import { BsSearch } from 'react-icons/bs';
import { IoMdTrash } from 'react-icons/io';
import { RiFolderAddLine } from 'react-icons/ri';

interface libraryNode {
  key: string;
  annotatedPageId: string;
  likes: bigint;
  comments: string[];
  children: libraryNode[];
}

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
  width: 200px;
  height: auto;
  border: 2px solid rgba(72, 72, 72, 0.2);
  padding: 5px;
  border-radius: 10px;

  @media (max-width: 1200px) {
    right: 2rem;
  }
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
  width: 220px;
  height: 220px;
  background-color: rgba(102, 51, 0, 0.2);
  border-radius: 20px;
  border: 2px solid rgba(72, 72, 72, 0.2);
  margin: 0 10px 20px 10px;
  position: relative;
  cursor: pointer;
`;

const Button = styled.button`
  border: none;
  cursor: pointer;

  &:hover {
    opacity: 0.5;
  }

  &:focus {
    outline: none;
  }
`;

const TooltipButton = styled.button`
  border: none;
  cursor: pointer;
  background-color: white;

  &:hover {
    opacity: 0.5;
  }

  &:focus {
    outline: none;
  }
`;

const ShelfButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;

  border: none;
  cursor: pointer;
  background-color: rgba(102, 51, 0, 0.01);

  &:hover {
    opacity: 0.5;
  }

  &:focus {
    outline: none;
  }
`;

const Indicator = styled.div`
  position: absolute;
  top: 5px;
  left: 5px;
`;

const Title = styled.div`
  font-weight: 700;
  text-align: center;
  font-size: 25px;
  margin-top: 25px;
`;

const ImgContainer = styled.div`
  width: 100px;
  height: 100px;
  padding-top: 30px;
  margin: auto;
`;

const Profile = () => {
  const history = useHistory();
  const [privateProfile, setPrivateProfile] = useState(true);
  const [showAnnotationModal, setShowAnnotationModal] = useState(false);
  const [showFolderModal, setShowFolderModal] = useState(false);
  const [showAnnotateEditorModal, setShowAnnotateEditorModal] = useState(false);
  const [libraries, setLibraries] = useState<libraryNode[]>([]);
  const [content, setContent] = useState('');

  const updateLibrary = (library: libraryNode) => {
    const index = libraries.indexOf(library);
    const librariesCopy = [...libraries];
    if (index > -1) {
      librariesCopy.splice(index, 1);
      setLibraries(librariesCopy);
    }
  };

  return (
    <>
      <FlexContainer>
        <Sidebar />
        <ContentContainer>
          <OptionsContainer>
            <Tooltip title="Toggle privacy" placement="bottom">
              <Button onClick={() => setPrivateProfile(!privateProfile)}>
                {privateProfile ? (
                  <MdLockOutline size={25} color="darkred" />
                ) : (
                  <MdLockOpen size={25} color="green" />
                )}
              </Button>
            </Tooltip>
            <Tooltip title="Share profile" placement="bottom">
              <Button
                onClick={() =>
                  navigator.clipboard
                    .writeText('https://hackmit.org/')
                    .then(() =>
                      alert('Shareable profile link copied to clipboard 🚀')
                    )
                }
              >
                <MdShare size={25} />
              </Button>
            </Tooltip>
            <Tooltip title="Friends" placement="bottom">
              <Button onClick={() => history.push('/friends')}>
                <MdPeople size={25} />
              </Button>
            </Tooltip>
            <Tooltip title="More Info" placement="bottom">
              <Button onClick={() => console.log('Add help modal')}>
                <MdHelpOutline size={25} />
              </Button>
            </Tooltip>
          </OptionsContainer>
          <AvatarContainer>
            <AvatarImgContainer>
              <AvatarImg src="/images/elon.jpg" />
            </AvatarImgContainer>
            <AvatarName>Elon Musk</AvatarName>
            <button
              className="button is-primary is-light is-outlined"
              onClick={() => setShowAnnotationModal(true)}
            >
              <span className="icon">
                <i className="fas fa-plus-square"></i>
              </span>
              <span>New annotation</span>
            </button>
          </AvatarContainer>
          <ToolbarContainer>
            <Tooltip title="Create folder" placement="bottom">
              <TooltipButton onClick={() => setShowFolderModal(true)}>
                <RiFolderAddLine size={25} />
              </TooltipButton>
            </Tooltip>
            <Tooltip title="Search for a link" placement="bottom">
              <TooltipButton onClick={() => console.log('Placeholder')}>
                <BsSearch size={25} />
              </TooltipButton>
            </Tooltip>
          </ToolbarContainer>
          <Bookshelf>
            {libraries.map((library: libraryNode) => (
              <ShelfItemContainer>
                <Tooltip title="Delete folder" placement="top">
                  <ShelfButton onClick={() => updateLibrary(library)}>
                    <IoMdTrash size={25} color="darkred" />
                  </ShelfButton>
                </Tooltip>
                <Indicator>
                  <MdImportContacts size={25} />
                </Indicator>

                <ImgContainer>
                  <MdFolder size={100} />
                </ImgContainer>
                <Title>{library.key}</Title>
              </ShelfItemContainer>
            ))}
          </Bookshelf>
        </ContentContainer>
      </FlexContainer>
      {showAnnotationModal && (
        <CreateAnnotationModal
          show={showAnnotationModal}
          setShow={setShowAnnotationModal}
          setAnnotate={setShowAnnotateEditorModal}
          setContent={setContent}
          libraries={libraries}
          setLibraries={setLibraries}
        />
      )}
      {showFolderModal && (
        <CreateFolderModal
          show={showFolderModal}
          setShow={setShowFolderModal}
          libraries={libraries}
          setLibraries={setLibraries}
        />
      )}
      {showAnnotateEditorModal && (
        <AnnotateModal
          show={showAnnotateEditorModal}
          setShow={setShowAnnotateEditorModal}
          content={content}
        />
      )}
    </>
  );
};

export default Profile;
