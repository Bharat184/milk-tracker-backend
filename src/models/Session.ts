import mongoose, { Schema, Document } from 'mongoose';

export interface ISession extends Document {
  start_time: Date;
  end_time: Date;
  duration: number;
  milk_quantity: number;
}

const SessionSchema: Schema = new Schema({
  start_time: { type: Date, required: true },
  end_time: { type: Date, required: true },
  duration: { type: Number, required: true },
  milk_quantity: { type: Number, required: true }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: function (doc, ret: Partial<any>) {
      delete ret._id;
      delete ret.__v;
    }
  },
  toObject: { virtuals: true }
});

export default mongoose.model<ISession>('Session', SessionSchema);
