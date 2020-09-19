import express from 'express';
import {AnnotatedPage, IAnnotatedPage} from '../models/annotatedpage.model';
import errorHandler from './error';

const router = express.Router();

router.post('/newpage', async (req, res) => {
    const {userId} = req.body;
    const {page} = req.body;
    const {likes} = req.body;
    const {comments} = req.body;
    const newAnnotatedPage = new AnnotatedPage({
        userId,
        page,
        likes,
        comments,
    });
    return newAnnotatedPage
        .save()
        .then(() => res.status(200).json({success: true}))
        .catch((e) => errorHandler(res, e.message));
});

export default router;

