import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
  MdHome,
  MdWidgets,
  MdPalette,
  MdContactMail,
  MdPeople,
} from 'react-icons/md';

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 40px;
  max-width: 200px;
  width: 100%;
  margin-left: 2.5rem;
  margin-top: 5%;
`;

const SidebarOption = styled.div`
  display: flex;
  justify-content: flex-start;
  cursor: pointer;
  width: 90%;
  margin: 0 auto 20px 0;
  text-align: center;
  background-color: rgba(72, 72, 72, 0.05);
  padding: 5px 0;
  border-radius: 10px;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 10px;
    opacity: 0.9;
    background-color: rgba(44, 62, 80, 0.1);
  }
  &:active {
    opacity: 0.6;
  }
`;

const SidebarLabel = styled.div`
  font-size: 20px;
  font-weight: 400;
  color: black;
`;

const Icon = styled.div`
  margin: 0 15px;
  m
`;

interface Props {}

interface SidebarOptions {
  title: string;
  path?: string;
  icon?: JSX.Element;
}

const options: SidebarOptions[] = [
  {
    title: 'Home',
    path: '/home',
    icon: <MdHome size={25} />,
  },
  {
    title: 'Profile',
    path: '/profile',
    icon: <MdPalette size={25} />,
  },
  {
    title: 'Discover',
    path: '/discover',
    icon: <MdWidgets size={25} />,
  },
  {
    title: 'Messages',
    path: '/messages',
    icon: <MdContactMail size={25} />,
  },
  {
    title: 'Friends',
    path: '/friends',
    icon: <MdPeople size={25} />,
  },
];

const Sidebar: React.FC<Props> = (props) => {
  return (
    <SidebarContainer>
      {options.map((option) => (
        <Link
          to={option.path || '/'}
          key={option.title + option.path}
          style={{ color: 'gray' }}
        >
          <SidebarOption>
            <Icon>{option.icon}</Icon>
            <SidebarLabel>{option.title}</SidebarLabel>
          </SidebarOption>
        </Link>
      ))}
    </SidebarContainer>
  );
};

export default Sidebar;
