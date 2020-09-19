import React, { useEffect } from 'react';
import { Field, FieldAttributes, Form, Formik } from 'formik';
import styled from 'styled-components';
import auth from '../../api/auth';

import { fetchMe } from '../../api/userApi';
import { useQuery } from 'react-query';
import { useHistory } from 'react-router-dom';

import Sidebar from '../../components/Sidebar';
import LinkCard from '../../components/ui/LinkCard';

// placeholder data
const linkFeed = [
  {
    _id: '1',
    linkUrl: 'https://www.google.com',
    senderName: 'John Smith',
    description: 'Hey! Check out this cool link',
    timestamp: '2020-07-06T20:36:59.414Z',
    votes: '1',
    pinned: false,
  },
  {
    _id: '2',
    linkUrl: 'https://www.theverge.com',
    senderName: 'May Smith',
    description: 'Hey! Check out this cool link',
    timestamp: '2020-07-06T20:36:59.414Z',
    votes: '1',
    pinned: false,
  },
  {
    _id: '3',
    linkUrl: 'https://www.techcrunch.com',
    senderName: 'May Smith',
    timestamp: '2020-07-06T20:36:59.414Z',
    votes: '1',
    pinned: false,
  },
  {
    _id: '4',
    linkUrl: 'https://www.theverge.com',
    senderName: 'May Smith',
    description: 'Hey! Check out this cool link',
    timestamp: '2020-07-06T20:36:59.414Z',
    votes: '1',
    pinned: false,
  },
];

const ContentContainer = styled.div`
  margin: 5% 0;
  padding: 0px 20px;
  width: 80%;
`;

const FlexContainer = styled.div`
  display: flex;
`;

const FormContainer = styled.div`
  width: 60%;
`;

const Button = styled.button`
  margin: 5px 0px;
  width: 150px;
`;

const initialValues = {
  linkUrl: '',
  linkDescription: '',
  private: false,
};

interface LinkParams {
  linkUrl: string;
  linkDescription: string;
  private: boolean;
}

const Home = () => {
  const {
    isLoading,
    isError,
    data: myProfile,
    error,
  }: {
    isLoading: boolean;
    isError: boolean;
    data: any;
    error: any;
  } = useQuery(['fetchMe', { accessToken: auth.getAccessToken() }], fetchMe);
  let history = useHistory();

  const handleSubmit = (values: LinkParams) => {
    console.log(values);
  };

  return (
    <FlexContainer>
      <Sidebar />
      <ContentContainer>
        <h3 className="title is-3">Bookshelf for all your links</h3>
        <FormContainer>
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            <Form>
              <Field
                name="linkUrl"
                className="input"
                type="text"
                placeholder="https://hackmit.org/"
                style={{ margin: '10px 0px' }}
              />

              <Field
                name="linkDescription"
                className="input"
                type="text"
                placeholder="What's cool about this link?"
                style={{ margin: '10px 0px' }}
              />
              <div>
                <Field
                  name="private"
                  className="checkbox"
                  type="checkbox"
                  style={{ margin: '10px 0px' }}
                />
                <label> Make Private</label>
              </div>
              <Button className="button is-primary" type="submit">
                Save
              </Button>
            </Form>
          </Formik>
        </FormContainer>

        <div style={{ margin: '40px 0px', width: '60%' }}>
          {linkFeed.map((link) => (
            <LinkCard key={link._id} link={link} />
          ))}
        </div>
      </ContentContainer>
    </FlexContainer>
  );
};

export default Home;
