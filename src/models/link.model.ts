import mongoose from 'mongoose';

const { Schema } = mongoose;

interface ILink extends mongoose.Document {
  _id: string;
  linkUrl: string;
  timestamp: Date;
  userId: string;
  username: string;
  description: string;
  privateStatus: boolean;
  html: string;
}

const LinkSchema = new Schema({
  linkUrl: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  username: { type: String, required: true },
  userId: { type: String, required: true },
  description: { type: String, required: false },
  privateStatus: { type: Boolean, default: true },
  html: { type: String, required: false },
});

const Link = mongoose.model<ILink>('Link', LinkSchema);

export { Link, ILink };
