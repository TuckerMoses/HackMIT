import mongoose from 'mongoose';

const { Schema } = mongoose;

interface IAnnotatedPage extends mongoose.Document{
    _id: string;
    userId: string;
    page: string;
    likes: bigint;
    comments: string[];
    summary: string;
}

const AnnotatedPageSchema = new Schema({
    userId: {type: String, required: true},
    page: {type: String, required: true},
    likes: {type: Number, required: true},
    comments: {type: [String], required: true},
    summary: {type: String, required: false},
});

const AnnotatedPage = mongoose.model<IAnnotatedPage>('AnnotatedPage', AnnotatedPageSchema);

export { AnnotatedPage, IAnnotatedPage };