import { Schema, model, models } from 'mongoose';
import { IGateway } from 'src/interfaces/gateway';

const gatewaySchema = new Schema<IGateway>({
    name: {
        type: String,
        unique: true,
        required: [true, 'name is required'] 
    },
    serial_number: {
        type: String,
        required: [true, 'serial_number is required'] 
    },
    ip: {
        type: String,
        required: [true, 'ip is required']
    },
    devices: [{
        type: Schema.Types.ObjectId,
        ref: "Device",
        default:[]
    }]
  });
  
export const Gateway = models.Gateway || model<IGateway>('Gateway', gatewaySchema);