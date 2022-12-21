import { Types } from "mongoose";

export interface IGateway {
    serial_number: string;
    name: string;
    ip: string;
    devices?: Array<Types.ObjectId>
  } 