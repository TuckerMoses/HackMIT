import secureAxios from './apiClient';

const createLibrary = (userId: string, name: string) => {
  return new Promise((resolve, reject) => {
    secureAxios({
      url: '/api/library/newLibrary',
      method: 'POST',
      timeout: 0,
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        userId: userId,
        libs: [
          {
            key: name,
            annotatedPageId: '',
            likes: 0,
            comments: [],
            children: [],
          },
        ],
      }),
    })
      .then((res) => {
        console.log('Folder created');
        console.log(res);
        resolve(res.data.library.libs[0]);
      })
      .catch((err) => reject(err.response));
  });
};

export { createLibrary };
