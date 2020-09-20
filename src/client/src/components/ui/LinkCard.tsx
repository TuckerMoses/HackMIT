/** @format */

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { fetchMetadata } from '../../api/linkApi';
import { parseISO, formatDistanceToNow } from 'date-fns';

interface Link {
  _id: string;
  description?: string;
  linkUrl: string;
  username: string;
  timestamp: string;
}

interface Metadata {
  url: string;
  domain: string;
  title: string;
  img: string;
  description: string;
  favicon: string;
}

const LinkContainer = styled.div`
  width: '60%';
  margin: '20px 0px';

  &:hover {
    cursor: pointer;
  }
`;

function LinkCard({ link }: { link: Link }) {
  const [preview, setPreview] = useState<Metadata | null>();
  let history = useHistory();

  const renderTimestamp = (date: number | Date) => {
    const timePeriod = formatDistanceToNow(date);

    return `${timePeriod} ago`
      .replace(/almost|about|over|ago?/gi, '')
      .replace(/\s/gi, '')
      .replace(/lessthanaminute?/gi, '1minutes')
      .replace(/minutes?/gi, 'min')
      .replace(/days?/gi, 'd')
      .replace(/hours?/gi, 'h');
  };

  useEffect(() => {
    fetchMetadata(link.linkUrl)
      .then((res) => {
        const data = res as Metadata;
        setPreview(data);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleClick = () => {
    history.push(`link/${link._id}`);
  };

  return (
    <LinkContainer className="box" onClick={handleClick}>
      <article className="media">
        <div className="media-left">
          <figure className="image is-64x64">
            {preview ? (
              <img src={preview.favicon} alt="Image" />
            ) : (
              <img
                src="https://bulma.io/images/placeholders/128x128.png"
                alt="Image"
              />
            )}
          </figure>
        </div>
        <div className="media-content">
          <div className="content">
            <p>
              <strong>{link.username}</strong>{' '}
              <small>{renderTimestamp(Date.parse(link.timestamp))}</small>
              {link.description && (
                <>
                  <br />
                  <strong>{link.description}</strong>
                </>
              )}
              <br />
              {preview && <i>"{preview.description}"</i>}
            </p>
          </div>
          <nav className="level is-mobile">
            <div className="level-left">
              <a className="level-item" aria-label="reply">
                <span className="icon is-small">
                  <i className="fas fa-reply" aria-hidden="true"></i>
                </span>
              </a>
              <a className="level-item" aria-label="retweet">
                <span className="icon is-small">
                  <i className="fas fa-retweet" aria-hidden="true"></i>
                </span>
              </a>
              <a className="level-item" aria-label="like">
                <span className="icon is-small">
                  <i className="fas fa-heart" aria-hidden="true"></i>
                </span>
              </a>
            </div>
          </nav>
        </div>
      </article>
    </LinkContainer>
  );
}

export default LinkCard;
