import express from 'express';
import { Library, ILibrary } from '../models/library.model';
import errorHandler from './error';

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

<<<<<<< HEAD
router.put('/update', async(req, res) => {
    const{_id} = req.body;
    const{userId} = req.body;
    const{libs} = req.body;
    return Library.findByIdAndUpdate(_id, {
        userId: userId,
        libs: libs,
    }, {new: true}, (err, docs) => {
        if(err) return err;
        return res.status(200).json({success: true, updatedLib: docs});
    })
});

router.get('/get', async (req, res) => {
  const { _id } = req.query;
  return Library.findById(_id, (err, library) => {
    if (err) return err;
    return res.status(200).json({ success: true, library: library });
  });
});

router.delete('/delete', async (req, res) => {
  const { _id } = req.query;
  return Library.findByIdAndDelete(_id)
    .then(() => res.status(200).json({ success: true }))
    .catch((e) => errorHandler(res, e));
});

export default router;
