import { Types } from "mongoose";

export interface IDevice {
    uid: number;
    vendor: string;
    created_date?: Date;
    status: 'online' | 'offline';
} 