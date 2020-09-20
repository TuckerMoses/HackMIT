import mongoose from 'mongoose';

const { Schema } = mongoose;

interface LibraryNode {
  key: string;
  annotatedPageId: string;
  likes: bigint;
  comments: string[];
  children: LibraryNode[];
}

interface ILibrary extends mongoose.Document {
  _id: string;
  userId: string;
  libs: LibraryNode[];
}

const LibrarySchema = new Schema({
  userId: { type: String, required: true },
  libs: { type: Schema.Types.Mixed, required: true },
});

const Library = mongoose.model<ILibrary>('Library', LibrarySchema);
export { Library, ILibrary };
