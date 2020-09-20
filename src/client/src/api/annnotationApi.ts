import secureAxios from './apiClient';

const fetchLinkContent = (userId: string, link: string) => {
  return new Promise((resolve, reject) => {
    secureAxios({
      url: '/api/annotatedpages/newpage',
      method: 'POST',
      timeout: 0,
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        searchurl: link,
        userId: userId,
      }),
    })
      .then((res) => {
        console.log('Article summary');
        console.log(res);
        resolve(res.data.content);
      })
      .catch((err) => reject(err.response));
  });
};

export { fetchLinkContent };
