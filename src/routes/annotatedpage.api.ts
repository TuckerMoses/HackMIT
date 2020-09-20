import express from 'express';
import {AnnotatedPage, IAnnotatedPage} from '../models/annotatedpage.model';
import cheerio from 'cheerio';
import fetch from 'node-fetch';
import url from 'url';
import jsdom from 'jsdom';
import errorHandler from './error';
import {Library} from "../models/library.model";

var { Readability } = require('@mozilla/readability');
const router = express.Router();

const validateUrl = (inputURL: string): boolean => {
    const urlRegexp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
    return urlRegexp.test(inputURL);
};

router.post('/newpage', async (req, res) => {
<<<<<<< HEAD
    let {searchurl} = req.query;
    let {userId} = req.query;
    if(searchurl == undefined || userId == undefined){
        return res.status(400).json({failure: "either url or userId not passed"});
    }
    searchurl = searchurl.toString();
    userId = userId.toString();
    if (!validateUrl(searchurl)) return errorHandler(res, 'Invalid URL.');

    const resp = await fetch(searchurl);
    const html = await resp.text();
    const {JSDOM} = jsdom;
    const doc = new JSDOM(html);
    const reader = new Readability(doc.window.document);
    const article = reader.parse().textContent;
    const newPage = new AnnotatedPage({
        userId,
        page: article
    });
    return newPage
        .save()
        .then(() => res.status(200).json({ success: true }))
        .catch((e) => errorHandler(res, e.message));
});

router.put('/update', async(req, res)=> {
    const {_id} = req.body;
    const { annotations } = req.body;
    const {summary} = req.body;

    const filter = {_id: _id};
    const update = {
        annotations: annotations,
        summary: summary,
    };
    return AnnotatedPage.findByIdAndUpdate(filter, update, {
        new: true,
    }, (err, page) => {
        if(err) return err;
        return res.status(200).json({success: true, updatedPage: page});
    });
});

router.get('/get', async (req, res) => {
    let {_id} = req.query;
    if(_id == undefined){
        return res.status(400).json({failure: "no _id given"});
    }
    _id = _id.toString();
    return AnnotatedPage.findById(_id, (err, page) => {
        if(err) return err;
        return res.status(200).json({success: true, page: page});
    });
});

router.delete('/delete', async(req, res) => {
    const {_id} = req.query;
    return AnnotatedPage.findByIdAndDelete(_id)
        .then(() => res.status(200).json({ success: true }))
        .catch((e) => errorHandler(res, e));
});

export default router;
