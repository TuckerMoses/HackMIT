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
        <img
          src="/images/chatbot_placeholder.png"
          style={{ width: '50vw', marginTop: '20px' }}
        />
        <div style={{ marginTop: '20px' }}>
          <input
            className="input"
            placeholder="Type your message here..."
            style={{
              display: 'inline-block',
              width: '43vw',
              marginRight: '20px',
            }}
          ></input>
          <button className="button is-info">Send</button>
        </div>
      </ContentContainer>
    </FlexContainer>
  );
};

export default ConnectBot;
