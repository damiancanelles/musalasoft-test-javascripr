import { object, string, number, TypeOf } from "yup";

export const deviceSchema = object({
    uid: string().required(),
    vendor: string().required(),
    status: string().required().oneOf(['online', 'offline'])
})

export type Device = TypeOf<typeof deviceSchema>

export const deviceCreateSchema = object({
    uid: string().required(),
    vendor: string().required(),
    status: string().required().oneOf(['online', 'offline']),
    gateway_id: string().required()
})

export type DeviceCreate = TypeOf<typeof deviceCreateSchema>