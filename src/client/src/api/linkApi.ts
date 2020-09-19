import secureAxios from './apiClient';

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

export { fetchMetadata };
