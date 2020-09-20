import express from 'express';
import { Library } from '../models/library.model';
import errorHandler from './error';
import auth from '../middleware/auth';

const router = express.Router();

router.post('/newlibrary', async (req, res) => {
  const { userId } = req.body;
  const { libs } = req.body;
  const newLibrary = new Library({
    userId,
    libs,
  });
  return newLibrary
    .save()
    .then(() => res.status(200).json({ success: true, library: newLibrary }))
    .catch((e) => errorHandler(res, e.message));
});

router.put('/update', auth, async (req, res) => {
  const { libraryId } = req.body;
  const { userId } = req.body;
  const { libs } = req.body;
  return Library.findByIdAndUpdate(
    libraryId,
    {
      userId,
      libs,
    },
    (err, docs) => {
      if (err) return err;
      return res.status(200).json({ success: true, updatedLib: docs });
    }
  );
});

router.get('/get', async (req, res) => {
  const { libraryId } = req.query;
  return Library.findById(libraryId, (err, library) => {
    if (err) return err;
    return res.status(200).json({ success: true, library });
  });
});

router.get('/getbyuserid', async (req, res) => {
  let { userId } = req.query;
  if(userId == undefined){
    return res.status(400).json({failure: "no _id given"});
  }
  userId = userId.toString();
  return Library.find({userId}, (err, library) => {
    if (err) return err;
    return res.status(200).json({ success: true, library });
  });
});

router.delete('/delete', async (req, res) => {
  const { libraryId } = req.query;
  return Library.findByIdAndDelete(libraryId)
    .then(() => res.status(200).json({ success: true }))
    .catch((e) => errorHandler(res, e));
});

export default router;
