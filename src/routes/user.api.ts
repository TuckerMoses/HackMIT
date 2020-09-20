import express from 'express';
import { hash, compare } from 'bcrypt';
import { User, IUser } from '../models/user.model';
import { Follower, IFollower } from '../models/follower.model';
import auth from '../middleware/auth';
import errorHandler from './error';
import {
  generateAccessToken,
  generateRefreshToken,
  validateRefreshToken,
} from './user.util';

const router = express.Router();

const saltRounds = 10;

// create new user
router.post('/signup', async (req, res) => {
  const { firstName } = req.body;
  const { lastName } = req.body;
  const { email } = req.body;
  const { password } = req.body;

  if (await User.findOne({ email })) {
    return errorHandler(res, 'User already exists.');
  }

  // hash + salt password
  return hash(password, saltRounds, (err, hashedPassword) => {
    if (err) {
      return errorHandler(res, err.message);
    }

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    return newUser
      .save()
      .then(() => res.status(200).json({ success: true }))
      .catch((e) => errorHandler(res, e.message));
  });
});

// login user
router.post('/login', async (req, res) => {
  const { email } = req.body;
  const { password } = req.body;

  User.findOne({ email }).then((user):
    | Response
    | Promise<boolean>
    | boolean
    | PromiseLike<boolean> => {
    // user does not exist
    if (!user) return errorHandler(res, 'User email or password is incorrect.');

    return compare(password, user.password, (err, result) => {
      if (err) return errorHandler(res, err.message);

      if (result) {
        // password matched
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        return Promise.all([accessToken, refreshToken]).then((tokens) =>
          res.status(200).json({
            success: true,
            accessToken: tokens[0],
            refreshToken: tokens[1],
          })
        );
      }

      // wrong password
      return errorHandler(res, 'User email or password is incorrect.');
    });
  });
});

// refresh token
router.post('/refreshToken', (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return errorHandler(res, 'No token provided.');
  }

  return validateRefreshToken(refreshToken)
    .then((tokenResponse: IUser) => generateAccessToken(tokenResponse))
    .then((accessToken: string) => {
      res.status(200).json({
        success: true,
        accessToken,
      });
    })
    .catch((err: { code: string; message: string }) => {
      if (err.code) {
        return errorHandler(res, err.message, err.code);
      }
      return errorHandler(res, err.message);
    });
});

// get me
// protected route
router.get('/me', auth, (req, res) => {
  const { userId } = req;

  return User.findById(userId)
    .select('firstName lastName email _id')
    .then((user) => {
      if (!user) return errorHandler(res, 'User does not exist.');

      return res.status(200).json({ success: true, data: user });
    })
    .catch((err) => errorHandler(res, err.message));
});

// search for a user
router.get('/search', auth, async (req, res) => {
  const { firstName } = req.body;
  const { lastName } = req.body;

  const searchQuery: any = {};
  if (firstName) searchQuery.firstName = firstName as string;
  if (lastName) searchQuery.lastName = lastName as string;

  const results = await User.find(searchQuery)
    .select('firstName lastName email _id')
    .exec();

  return res.status(200).json({ success: true, data: results });
});

// toggle follow a user
router.get('/follow', auth, async (req, res) => {
  const { userId } = req;
  const { recipientId } = req.body;

  const user = await User.findById(userId);
  if (!user) return errorHandler(res, 'User does not exist.');
  const username = `${user.firstName} ${user.lastName}`;

  const recipient = await User.findById(recipientId);
  if (!recipient) return errorHandler(res, 'Recipient does not exist.');

  // try and find if user already follows recipient, if so unfollow
  const existingFollow = await Follower.findOne({ userId, recipientId });
  if (existingFollow) {
    await Follower.deleteOne({ userId, recipientId });
    return res
      .status(200)
      .json({ success: true, message: 'User unfollow success' });
  }

  const newFollower = new Follower({
    userId,
    username,
    recipientId,
  });

  await newFollower.save();

  return res
    .status(200)
    .json({ success: true, message: 'User follow success' });
});

// getting all of my follower
router.get('/followers', auth, async (req, res) => {
  const { userId } = req;

  // my followers are those who have me as their recipient
  const followerIds = (await Follower.find({ recipientId: userId })).map(
    (val: IFollower) => val.recipientId
  );

  const result = await Promise.all(
    followerIds.map((id: string) =>
      User.findById(id).select('firstName lastName email _id')
    )
  );

  return res.status(200).json({ success: true, data: result });
});

// getting all of my following
router.get('/followings', auth, async (req, res) => {
  const { userId } = req;

  // my following are all the request ive sent
  const followingIds = (await Follower.find({ userId })).map(
    (val: IFollower) => val.recipientId
  );

  const result = await Promise.all(
    followingIds.map((id: string) =>
      User.findById(id).select('firstName lastName email _id')
    )
  );

  return res.status(200).json({ success: true, data: result });
});

// TESTING ROUTES BELOW
// get all users
router.get('/', (_, res) => {
  User.find({})
    .then((result) => res.status(200).json({ success: true, result }))
    .catch((e) => errorHandler(res, e));
});

// delete all users
router.delete('/', (_, res) => {
  User.deleteMany({})
    .then(() => res.status(200).json({ success: true }))
    .catch((e) => errorHandler(res, e));
});

export default router;
