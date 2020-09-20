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

const createLink = (userId: string, name: string, link: string) => {
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
            annotatedPageId: link,
            likes: 0,
            comments: [],
            children: [],
          },
        ],
      }),
    })
      .then((res) => {
        console.log('Link created');
        console.log(res);
        resolve(res.data.library.libs[0]);
      })
      .catch((err) => reject(err.response));
  });
};

const getLibrariesByUser = (userId: string) => {
  return new Promise((resolve, reject) => {
    secureAxios({
      url: `/api/library/getbyuserid?userId=${userId}`,
      method: 'GET',
      timeout: 0,
    })
      .then((response) => {
        const library = response.data.library;
        console.log('FOUND');
        console.log(library);
        resolve(library);
      })
      .catch((err) => reject(err.response));
  });
};

export { createLibrary, createLink, getLibrariesByUser };
