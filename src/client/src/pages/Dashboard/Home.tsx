import { Field, Form, Formik } from 'formik';
import React from 'react';
import { useQuery, useMutation } from 'react-query';
import styled from 'styled-components';
import auth from '../../api/auth';
import { fetchFeed, createNewLink } from '../../api/linkApi';
import Sidebar from '../../components/Sidebar';
import LinkCard from '../../components/ui/LinkCard';

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
  description: '',
  privateStatus: false,
};

interface LinkParams {
  linkUrl: string;
  description?: string;
  privateStatus: boolean;
}

interface Link {
  _id: string;
  description?: string;
  linkUrl: string;
  username: string;
  timestamp: string;
}

const Home = () => {
  const feedQuery = useQuery(
    ['fetchFeed', { accessToken: auth.getAccessToken() }],
    fetchFeed
  );
  const [newLinkMutation] = useMutation(createNewLink);

  const handleSubmit = async (values: LinkParams) => {
    try {
      await newLinkMutation({
        accessToken: auth.getAccessToken(),
        link: values,
      });
      feedQuery.refetch();
    } catch (e) {
      console.error(e);
    }
  };

  const LinkFeed = (res: any) => {
    const data = res as Link[];
    if (data.length < 1) return <h1>Oops. No links yet.</h1>;

    return data.map((link) => <LinkCard key={link._id} link={link} />);
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
                name="description"
                className="input"
                type="text"
                placeholder="What's cool about this link?"
                style={{ margin: '10px 0px' }}
              />
              <div>
                <Field
                  name="privateStatus"
                  className="checkbox"
                  type="checkbox"
                  style={{ margin: '10px 0px' }}
                />
                <label> Make Private</label>
              </div>
              <Button
                className="button is-primary is-light is-outlined"
                type="submit"
              >
                Save
              </Button>
            </Form>
          </Formik>
        </FormContainer>
        <div style={{ margin: '40px 0px', width: '60%' }}>
          {feedQuery.isLoading && <h1>Loading...</h1>}
          {feedQuery.data && LinkFeed(feedQuery.data)}
        </div>
      </ContentContainer>
    </FlexContainer>
  );
};

export default Home;
