import mongoose from 'mongoose';

const { Schema } = mongoose;

interface Annotation{
    start: bigint;
    end: bigint;
    tag: string;
}

interface IAnnotatedPage extends mongoose.Document{
    _id: string;
    userId: string;
    page: string;
    annotations: Annotation[];
    summary: string;
}

const AnnotatedPageSchema = new Schema({
    userId: {type: String, required: true},
    page: {type: String, required: true},
    annotations: [{
        start: {type: Number, required: true},
        end: {type: Number, required: true},
        tag: {type: String, required: false},
    }],
    summary: {type: String, required: false},
});

const AnnotatedPage = mongoose.model<IAnnotatedPage>(
  'AnnotatedPage',
  AnnotatedPageSchema
);

export { AnnotatedPage, IAnnotatedPage };
