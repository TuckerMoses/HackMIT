import express from 'express';
import {Library, ILibrary} from "../models/library.model";
import errorHandler from "./error";

const router = express.Router();

router.post('/newlibrary', async (req, res) => {
    const {userId} = req.body;
    const {libs} = req.body;
    const newLibrary = new Library({
        userId,
        libs,
    });
    return newLibrary
        .save()
        .then(() => res.status(200).json({success: true, library: newLibrary}))
        .catch((e) => errorHandler(res, e.message));
});

router.put('/update', async(req, res) => {
    const{_id} = req.body;
    const{userId} = req.body;
    const{libs} = req.body;
    return Library.findByIdAndUpdate(_id, {
        userId: userId,
        libs: libs,
    }, (err, docs) => {
        if(err) return err;
        return res.status(200).json({success: true, updatedLib: docs});
    })
});

export default router;