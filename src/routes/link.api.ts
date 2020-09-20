import cheerio from 'cheerio';
import express from 'express';
import fetch from 'node-fetch';
import url from 'url';
import { JSDOM } from 'jsdom';
import { Readability } from '@mozilla/readability';

import { Follower, IFollower } from '../models/follower.model';
import { ILink, Link } from '../models/link.model';
import { User } from '../models/user.model';
import errorHandler from './error';

import auth from '../middleware/auth';

const router = express.Router();

const validateUrl = (inputURL: string): boolean => {
  const urlRegexp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
  return urlRegexp.test(inputURL);
};

router.post('/create', auth, async (req, res) => {
  const { userId } = req;
  const { linkUrl } = req.body;
  const { description } = req.body;
  const { privateStatus } = req.body;

  const user = await User.findById(userId);
  if (!user) return errorHandler(res, 'User does not exist.');
  const username = `${user.firstName} ${user.lastName}`;

  const newLink = new Link({
    linkUrl,
    userId,
    username,
    description,
    privateStatus,
  });

  return newLink
    .save()
    .then(() => {
      return res
        .status(200)
        .json({ success: true, message: 'New link saved.' });
    })
    .catch((err) => {
      return errorHandler(res, err.message);
    });
});

router.get('/', auth, async (req, res) => {
  const { userId } = req;

  // my following are all the request ive sent
  const followingIds = (await Follower.find({ userId })).map(
    (val: IFollower) => val.recipientId
  );

  followingIds.push(userId!);

  // search for all post with userid that is in my following
  const results = (
    await Link.find({ userId: { $in: followingIds } }).sort({
      timestamp: 'desc',
    })
  ).filter(
    (link: ILink) =>
      (link.privateStatus === true && link.userId === userId) ||
      link.privateStatus === false
  );

  return res.status(200).json({ success: true, data: results });
});

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

// get link html
// if link html is not in database refetch it
router.get('/:linkId/html', auth, async (req, res) => {
  const { linkId } = req.params;

  const targetLink = await Link.findById(linkId);
  if (!targetLink) return errorHandler(res, 'Link does not exist.');
  if (targetLink.html)
    return res.status(200).json({ success: true, data: targetLink.html });

  // fetch raw page html
  const resp = await fetch(targetLink.linkUrl);
  const html = await resp.text();
  const doc = new JSDOM(html);
  const reader = new Readability(doc.window.document);
  const article = reader.parse().content;

  targetLink.html = article;
  await targetLink.save();

  return res.status(200).json({ success: true, data: targetLink.html });
});

// TESTING ROUTES BELOW
// get all users
router.get('/', (_, res) => {
  Link.find({})
    .then((result) => res.status(200).json({ success: true, result }))
    .catch((e) => errorHandler(res, e));
});

// delete all users
router.delete('/', (_, res) => {
  Link.deleteMany({})
    .then(() => res.status(200).json({ success: true }))
    .catch((e) => errorHandler(res, e));
});

export default router;
