import cheerio from 'cheerio';
import express from 'express';
import fetch from 'node-fetch';
import url from 'url';
import errorHandler from './error';

const router = express.Router();

const validateUrl = (inputURL: string): boolean => {
  const urlRegexp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
  return urlRegexp.test(inputURL);
};

// get link preview
router.post('/preview', async (req, res) => {
  const { previewUrl } = req.body;

  if (!validateUrl(previewUrl)) return errorHandler(res, 'Invalid URL.');

  const resp = await fetch(previewUrl);
  const html = await resp.text();
  const $ = cheerio.load(html);
  const domain = url.parse(previewUrl).hostname;
  let beautifiedDomain = previewUrl;
  if (domain) {
    const upperDomain = domain.charAt(0).toUpperCase() + domain.slice(1);
    beautifiedDomain = upperDomain.substring(0, upperDomain.lastIndexOf('.'));
  }

  const getMetaTag = (name: string) => {
    return (
      $(`meta[name=${name}]`).attr('content') ||
      $(`meta[name="og:${name}"]`).attr('content') ||
      $(`meta[name="twitter:${name}"]`).attr('content') ||
      $(`meta[property=${name}]`).attr('content') ||
      $(`meta[property="og:${name}"]`).attr('content') ||
      $(`meta[property="twitter:${name}"]`).attr('content')
    );
  };

  const metaTagData = {
    url: previewUrl,
    domain,
    title: getMetaTag('title') || $('title').text() || beautifiedDomain,
    img: getMetaTag('image'),
    description:
      getMetaTag('description') || $('p').text() || 'No description available',
    favicon: `https://s2.googleusercontent.com/s2/favicons?domain_url=${previewUrl}`,
  };

  const { description } = metaTagData;

  // avoiding description to be more then 200 chars
  if (description.length > 200) {
    metaTagData.description = `${description.substring(0, 200)}...`;
  }

  return res.status(200).json({ success: true, data: metaTagData });
});

export default router;
