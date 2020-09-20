import mongoose from 'mongoose';

const { Schema } = mongoose;

interface IFollower extends mongoose.Document {
  _id: string;
  userId: string;
  username: string;
  recipientId: string;
}

const FollowerSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  recipientId: {
    type: String,
    required: true,
  },
});

const Follower = mongoose.model<IFollower>('Friend Request', FollowerSchema);

export { Follower, IFollower };
