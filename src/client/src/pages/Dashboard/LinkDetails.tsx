import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Sidebar from '../../components/Sidebar';

const ContentContainer = styled.div`
  margin: 5% 0;
`;

const FlexContainer = styled.div`
  display: flex;
`;

const LinkDetails: React.FC<any> = (props) => {
  let history = useHistory();
  const linkId = props.match.params.id;

  return (
    <FlexContainer>
      <Sidebar />
      <ContentContainer>
        <button
          className="button is-rounded"
          onClick={() => history.push('/')}
          style={{ margin: '0px 10px 0px 0px' }}
        >
          <span className="icon is-small">
            <i className="fas fa-arrow-left"></i>
          </span>
          <span>Back</span>
        </button>
        <h3 className="title is-3" style={{ display: 'inline' }}>
          Link Details
        </h3>
        <div style={{ marginTop: '20px' }}>
          <p>Link Id: {linkId}</p>
        </div>
      </ContentContainer>
    </FlexContainer>
  );
};

export default LinkDetails;