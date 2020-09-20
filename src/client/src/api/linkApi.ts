import secureAxios from './apiClient';

interface NewLink {
  linkUrl: string;
  description?: string;
  privateStatus: boolean;
}

const fetchMetadata = (link: string) => {
  return new Promise((resolve, reject) => {
    secureAxios({
      url: '/api/links/preview',
      method: 'POST',
      timeout: 0,
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        previewUrl: link,
      }),
    })
      .then((response) => {
        const meta = response.data.data;
        resolve(meta);
      })
      .catch((err) => reject(err.response));
  });
};

const createNewLink = ({
  accessToken,
  link: { linkUrl, description, privateStatus },
}: {
  accessToken: string;
  link: NewLink;
}) => {
  return new Promise((resolve, reject) => {
    secureAxios({
      url: '/api/links/create',
      method: 'POST',
      timeout: 0,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        linkUrl,
        description,
        privateStatus,
      }),
    })
      .then(() => resolve())
      .catch((err) => reject(err.response));
  });
};

const fetchFeed = (_: string, { accessToken }: { accessToken: string }) => {
  return new Promise((resolve, reject) => {
    secureAxios({
      url: '/api/links/',
      method: 'GET',
      timeout: 0,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        const feed = response.data.data;
        resolve(feed);
      })
      .catch((err) => reject(err.response));
  });
};

export { fetchMetadata, createNewLink, fetchFeed };
