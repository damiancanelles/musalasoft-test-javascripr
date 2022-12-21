import { Schema, model, models } from 'mongoose';
import { IDevice } from 'src/interfaces/device';

const deviceSchema = new Schema<IDevice>({
    uid: {
        type: Number,
        required: [true, 'uid is required'],

    },
    vendor: {
        type: String,
        required: [true, 'vendor is required']
    },
    created_date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        required: [true, 'status is required'],
        enum: ['online', 'offline']
    },
  });
  
export const Device = models.Device || model<IDevice>('Device', deviceSchema)