import mongoose from 'mongoose';

const { Schema } = mongoose;

interface libraryNode {
  key: string;
  annotatedPageId: string;
  likes: bigint;
  comments: string[];
  children: libraryNode[];
}

interface ILibrary extends mongoose.Document {
  _id: string;
  userId: string;
  libs: libraryNode[];
}

const LibrarySchema = new Schema({
  userId: { type: String, required: true },
  libs: { type: Schema.Types.Mixed, required: true },
});

const Library = mongoose.model<ILibrary>('Library', LibrarySchema);
export { Library, ILibrary };
