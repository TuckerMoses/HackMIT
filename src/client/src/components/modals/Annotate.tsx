import React from 'react';
import styled from 'styled-components';
import { hot } from 'react-hot-loader';
import { TokenAnnotator } from 'react-text-annotate';
import { MdChatBubble } from 'react-icons/md';

const TAG_COLORS = {
  ORG: '#00ffa2',
  PERSON: '#84d2ff',
};

const Card = styled.div`
  box-shadow: '0 2px 4px rgba(0,0,0,.1)';
  margin: 6;
  max-width: 500;
  padding: 16;
`;

class Annotate extends React.Component<any, any> {
  state = {
    value: [{ start: 17, end: 19, tag: 'PERSON' }],
    tag: 'PERSON',
    content: '',
  };

  handleChange = (value: any) => {
    this.setState({ value });
  };

  handleTagChange = (e: { target: { value: any } }) => {
    this.setState({ tag: e.target.value });
  };

  render() {
    const TEXT = this.props.content;

    return (
      <div style={{ padding: 24, fontFamily: 'IBM Plex Sans' }}>
        <div style={{ display: 'flex', marginBottom: 24 }}>
          <Card>
            <TokenAnnotator
              style={{
                fontFamily: 'IBM Plex Sans',
                maxWidth: 500,
                lineHeight: 1.5,
              }}
              tokens={TEXT.split(' ')}
              value={this.state.value}
              onChange={this.handleChange}
              getSpan={(span: any) => ({
                ...span,
                tag: this.state.tag,
                color: '#00ffa2',
              })}
              renderMark={(props: {
                key: string | number | undefined;
                onClick: (arg0: { start: any; end: any }) => void;
                start: any;
                end: any;
                content: React.ReactNode;
                tag: React.ReactNode;
              }) => (
                <mark
                  key={props.key}
                  onClick={() =>
                    props.onClick({ start: props.start, end: props.end })
                  }
                >
                  {props.content} <MdChatBubble />
                </mark>
              )}
            />
          </Card>
        </div>
      </div>
    );
  }
}

export default hot(module)(Annotate);
