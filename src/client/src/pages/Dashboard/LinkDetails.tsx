import React from 'react';
import { useQuery } from 'react-query';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import auth from '../../api/auth';
import { fetchLinkAnnotation } from '../../api/linkApi';
import Sidebar from '../../components/Sidebar';

const ContentContainer = styled.div`
  margin: 5% 0;
`;

const FlexContainer = styled.div`
  display: flex;
`;

const LinkDetails: React.FC<any> = (props) => {
  const history = useHistory();
  const linkId = props.match.params.id;

  const annotationQuery = useQuery(
    ['fetchLinkAnnotation', { accessToken: auth.getAccessToken(), linkId }],
    fetchLinkAnnotation
  );

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
        <div
          dangerouslySetInnerHTML={{ __html: annotationQuery.data as string }}
          style={{ width: '60vw', marginTop: '20px' }}
        ></div>
      </ContentContainer>
    </FlexContainer>
  );
};

export default LinkDetails;
