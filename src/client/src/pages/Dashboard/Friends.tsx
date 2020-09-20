import { Field, Form, Formik } from 'formik';
import React from 'react';
import styled from 'styled-components';
import Sidebar from '../../components/Sidebar';
import { useHistory } from 'react-router-dom';
import FriendCard from '../../components/ui/FriendCard';

const friendsList = [
  {
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jsmith@gmail.com',
    profileImg: 'https://react.semantic-ui.com/images/avatar/small/jenny.jpg',
  },
  {
    firstName: 'Dan',
    lastName: 'Smith',
    email: 'jsmith@gmail.com',
    profileImg: 'https://semantic-ui.com/images/avatar2/large/elyse.png',
  },
  {
    firstName: 'Tony',
    lastName: 'Stark',
    email: 'jsmith@gmail.com',
    profileImg: 'https://semantic-ui.com/images/avatar2/large/matthew.png',
  },
  {
    firstName: 'Mary',
    lastName: 'Mohammed',
    email: 'mmohammed@gmail.com',
    profileImg: 'https://semantic-ui.com/images/avatar2/large/kristy.png',
  },
  {
    firstName: 'Johnny',
    lastName: 'Ive',
    email: 'jive@gmail.com',
    profileImg: 'https://react.semantic-ui.com/images/avatar/small/jenny.jpg',
  },
];

interface Friend {
  firstName: string;
  lastName: string;
  email: string;
  profileImg: string;
}

const ContentContainer = styled.div`
  margin: 5% 0;
  padding: 0px 20px;
  width: 80%;
`;

const FlexContainer = styled.div`
  display: flex;
`;

const initialValues = {
  friendName: '',
};

const Button = styled.button`
  margin: 5px 0px;
  width: 150px;
`;

const FormContainer = styled.div`
  width: 60%;
`;

const Friends = () => {
  let history = useHistory();

  const handleSubmit = () => {
    console.log('submit');
  };

  return (
    <FlexContainer>
      <Sidebar />
      <ContentContainer>
        <h3 className="title is-3">Your Friends</h3>
        <FormContainer>
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            <Form>
              <Field
                name="friendName"
                className="input"
                type="text"
                placeholder="John Smith"
                style={{ margin: '10px 0px' }}
              />

              <Button className="button is-primary" type="submit">
                Search
              </Button>
            </Form>
          </Formik>
        </FormContainer>

        <div style={{ width: '60%', margin: '40px 0px' }}>
          {friendsList.map((friend: Friend) => (
            <FriendCard friend={friend} />
          ))}
        </div>
      </ContentContainer>
    </FlexContainer>
  );
};

export default Friends;
